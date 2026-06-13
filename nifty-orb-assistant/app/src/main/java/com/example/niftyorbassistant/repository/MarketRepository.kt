package com.example.niftyorbassistant.repository

import android.content.Context
import android.net.Uri
import com.example.niftyorbassistant.data.local.dao.MarketSnapshotDao
import com.example.niftyorbassistant.data.local.dao.SettingsDao
import com.example.niftyorbassistant.data.local.dao.SignalDao
import com.example.niftyorbassistant.data.local.entity.MarketSnapshotEntity
import com.example.niftyorbassistant.data.local.entity.SettingsEntity
import com.example.niftyorbassistant.data.local.entity.SignalEntity
import com.example.niftyorbassistant.data.remote.MarketDataProvider
import com.example.niftyorbassistant.domain.BacktestEngine
import com.example.niftyorbassistant.domain.SignalEngine
import com.example.niftyorbassistant.domain.model.BacktestRange
import com.example.niftyorbassistant.domain.model.BacktestResult
import com.example.niftyorbassistant.domain.model.DataProviderType
import com.example.niftyorbassistant.domain.model.MarketSnapshot
import com.example.niftyorbassistant.domain.model.OptionQuote
import com.example.niftyorbassistant.domain.model.OrbLevels
import com.example.niftyorbassistant.domain.model.Settings
import com.example.niftyorbassistant.domain.model.SignalType
import com.example.niftyorbassistant.domain.model.TradingSignal
import com.example.niftyorbassistant.notifications.NotificationHelper
import com.example.niftyorbassistant.util.CsvExporter
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.withContext
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime

data class RepositoryState(
    val snapshot: MarketSnapshot?,
    val signals: List<TradingSignal>,
    val settings: Settings,
    val provider: DataProviderType,
)

class MarketRepository(
    private val context: Context,
    private val signalDao: SignalDao,
    private val snapshotDao: MarketSnapshotDao,
    private val settingsDao: SettingsDao,
    private val providers: Map<DataProviderType, MarketDataProvider>,
    private val notificationHelper: NotificationHelper,
    private val dispatcher: CoroutineDispatcher = Dispatchers.IO,
) {
    private var activeProviderType: DataProviderType = DataProviderType.NSE

    val state: Flow<RepositoryState> = combine(
        snapshotDao.observe(),
        signalDao.observeAll(),
        settingsDao.observe(),
    ) { snapshot, signals, settings ->
        RepositoryState(
            snapshot = snapshot?.toDomain(),
            signals = signals.map { it.toDomain() },
            settings = settings?.toDomain() ?: Settings(),
            provider = activeProviderType,
        )
    }

    suspend fun refresh(force: Boolean = true): Result<Unit> = withContext(dispatcher) {
        runCatching {
            val provider = requireProvider()
            val settings = settingsDao.observe().map { it?.toDomain() ?: Settings() }
            val snapshot = provider.fetchSnapshot()
            snapshotDao.upsert(snapshot.toEntity())

            val existing = signalDao.signalForDate(snapshot.timestamp.date.toString())?.toDomain()
            val recommendation = provider.resolveAtmOption(snapshot, isCall = true)
            val signal = SignalEngine.evaluate(snapshot, Settings(), existing, recommendation)
            if (signal != null) {
                signalDao.insert(signal.toEntity())
                notificationHelper.sendSignalNotification(context, signal)
            }
            if (snapshot.orbLevels != null) {
                notificationHelper.sendOrbNotification(context, snapshot.orbLevels)
            }
        }
    }

    suspend fun saveSettings(settings: Settings) = withContext(dispatcher) {
        settingsDao.upsert(settings.toEntity())
    }

    suspend fun setProvider(type: DataProviderType) = withContext(dispatcher) {
        activeProviderType = type
    }

    suspend fun runBacktest(range: BacktestRange, settings: Settings): BacktestResult = withContext(dispatcher) {
        val snapshots = requireProvider().fetchHistoricalSnapshots(range.days)
        BacktestEngine.run(range, snapshots, settings)
    }

    suspend fun exportHistory(): Uri = withContext(dispatcher) {
        CsvExporter.exportSignals(context, signalDao.observeAll())
    }

    private fun requireProvider(): MarketDataProvider =
        providers[activeProviderType] ?: error("Provider not registered: $activeProviderType")
}

private fun MarketSnapshot.toEntity(): MarketSnapshotEntity = MarketSnapshotEntity(
    provider = provider,
    timestamp = timestamp.toString(),
    marketStatus = marketStatus.name,
    livePrice = livePrice,
    lastClose = lastClose,
    previousDayHigh = previousDayHigh,
    previousDayLow = previousDayLow,
    currentDayHigh = currentDayHigh,
    currentDayLow = currentDayLow,
    vwap = vwap,
    ema20 = ema20,
    atmStrike = atmStrike,
    expiry = expiry,
    lastOptionPremium = lastOptionPremium,
    optionChainSupported = optionChainSupported,
    orbHigh = orbLevels?.high,
    orbLow = orbLevels?.low,
    rawCandlesJson = candles5m.joinToString("|") { listOf(it.timestamp, it.open, it.high, it.low, it.close, it.volume).joinToString(",") },
    rawOptionChainJson = optionChain.joinToString("|") { listOf(it.strike, it.callLtp, it.putLtp, it.callOi, it.putOi, it.callChangeOi, it.putChangeOi, it.callIv, it.putIv).joinToString(",") },
)

private fun MarketSnapshotEntity.toDomain(): MarketSnapshot {
    val candles = rawCandlesJson.takeIf { it.isNotBlank() }?.split("|")?.map { row ->
        val parts = row.split(",")
        com.example.niftyorbassistant.domain.model.Candle(
            timestamp = LocalDateTime.parse(parts[0]),
            open = parts[1].toDouble(),
            high = parts[2].toDouble(),
            low = parts[3].toDouble(),
            close = parts[4].toDouble(),
            volume = parts[5].toLong(),
        )
    }.orEmpty()
    val options = rawOptionChainJson.takeIf { it.isNotBlank() }?.split("|")?.map { row ->
        val parts = row.split(",")
        OptionQuote(
            strike = parts[0].toInt(),
            callLtp = parts[1].toDouble(),
            putLtp = parts[2].toDouble(),
            callOi = parts[3].toLong(),
            putOi = parts[4].toLong(),
            callChangeOi = parts[5].toLong(),
            putChangeOi = parts[6].toLong(),
            callIv = parts[7].toDouble(),
            putIv = parts[8].toDouble(),
        )
    }.orEmpty()

    return MarketSnapshot(
        provider = provider,
        timestamp = LocalDateTime.parse(timestamp),
        marketStatus = com.example.niftyorbassistant.domain.model.MarketStatus.valueOf(marketStatus),
        livePrice = livePrice,
        lastClose = lastClose,
        previousDayHigh = previousDayHigh,
        previousDayLow = previousDayLow,
        currentDayHigh = currentDayHigh,
        currentDayLow = currentDayLow,
        vwap = vwap,
        ema20 = ema20,
        atmStrike = atmStrike,
        expiry = expiry,
        lastOptionPremium = lastOptionPremium,
        optionChainSupported = optionChainSupported,
        optionChain = options,
        candles5m = candles,
        orbLevels = if (orbHigh != null && orbLow != null) OrbLevels(orbHigh, orbLow) else null,
    )
}

private fun SignalEntity.toDomain(): TradingSignal = TradingSignal(
    id = id,
    date = LocalDate.parse(tradeDate),
    type = type,
    signalTime = LocalDateTime.parse(signalTime),
    spotPrice = spotPrice,
    strike = strike,
    expiry = expiry,
    entry = entry,
    stopLoss = stopLoss,
    target = target,
    riskRewardRatio = riskRewardRatio,
    optionSymbol = optionSymbol,
    provider = provider,
)

private fun TradingSignal.toEntity(): SignalEntity = SignalEntity(
    id = id,
    tradeDate = date.toString(),
    type = type,
    signalTime = signalTime.toString(),
    spotPrice = spotPrice,
    strike = strike,
    expiry = expiry,
    entry = entry,
    stopLoss = stopLoss,
    target = target,
    riskRewardRatio = riskRewardRatio,
    optionSymbol = optionSymbol,
    provider = provider,
)

private fun SettingsEntity.toDomain(): Settings = Settings(
    stopLossPoints = stopLossPoints,
    targetPoints = targetPoints,
    emaLength = emaLength,
    breakoutBuffer = breakoutBuffer,
)

private fun Settings.toEntity(): SettingsEntity = SettingsEntity(
    stopLossPoints = stopLossPoints,
    targetPoints = targetPoints,
    emaLength = emaLength,
    breakoutBuffer = breakoutBuffer,
)
