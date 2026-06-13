package com.example.niftyorbassistant.data.remote

import com.example.niftyorbassistant.domain.IndicatorCalculator
import com.example.niftyorbassistant.domain.MarketHoursUtil
import com.example.niftyorbassistant.domain.model.Candle
import com.example.niftyorbassistant.domain.model.DataProviderType
import com.example.niftyorbassistant.domain.model.MarketSnapshot
import com.example.niftyorbassistant.domain.model.OptionQuote
import com.example.niftyorbassistant.domain.model.OptionRecommendation
import java.time.ZoneId
import kotlinx.datetime.Clock
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime

private val kolkataTz = TimeZone.of("Asia/Kolkata")

class DemoNseProvider : MarketDataProvider {
    override val type: DataProviderType = DataProviderType.NSE

    override suspend fun fetchSnapshot(): MarketSnapshot {
        val now = Clock.System.now().toLocalDateTime(kolkataTz)
        val candles = generateSession(now.date, 24350.0)
        val vwap = IndicatorCalculator.calculateVwap(candles)
        val ema = IndicatorCalculator.calculateEma(candles, 20)
        val last = candles.last()
        val atm = ((last.close / 50.0).toInt()) * 50
        return MarketSnapshot(
            provider = type,
            timestamp = now,
            marketStatus = MarketHoursUtil.marketStatus(),
            livePrice = last.close,
            lastClose = 24295.4,
            previousDayHigh = 24392.8,
            previousDayLow = 24240.2,
            currentDayHigh = candles.maxOf { it.high },
            currentDayLow = candles.minOf { it.low },
            vwap = vwap,
            ema20 = ema,
            atmStrike = atm,
            expiry = "27 JUN 2026",
            lastOptionPremium = 112.5,
            optionChainSupported = true,
            optionChain = buildOptionChain(atm),
            candles5m = candles,
            orbLevels = IndicatorCalculator.calculateOrbLevels(candles),
        )
    }

    override suspend fun fetchHistoricalSnapshots(days: Int): List<MarketSnapshot> {
        val today = Clock.System.now().toLocalDateTime(kolkataTz).date
        return (1..days).map { offset ->
            val date = LocalDate(today.year, today.monthNumber, today.dayOfMonth).minus(offset, kotlinx.datetime.DateTimeUnit.DAY)
            val candles = generateSession(date, 24100.0 + offset * 3)
            val last = candles.last()
            val atm = ((last.close / 50.0).toInt()) * 50
            MarketSnapshot(
                provider = type,
                timestamp = candles.last().timestamp,
                marketStatus = com.example.niftyorbassistant.domain.model.MarketStatus.CLOSED,
                livePrice = last.close,
                lastClose = last.close - 10,
                previousDayHigh = candles.maxOf { it.high } - 15,
                previousDayLow = candles.minOf { it.low } - 15,
                currentDayHigh = candles.maxOf { it.high },
                currentDayLow = candles.minOf { it.low },
                vwap = IndicatorCalculator.calculateVwap(candles),
                ema20 = IndicatorCalculator.calculateEma(candles, 20),
                atmStrike = atm,
                expiry = "WEEKLY",
                lastOptionPremium = 101.0 + offset,
                optionChainSupported = false,
                optionChain = emptyList(),
                candles5m = candles,
                orbLevels = IndicatorCalculator.calculateOrbLevels(candles),
            )
        }
    }

    override suspend fun resolveAtmOption(snapshot: MarketSnapshot, isCall: Boolean): OptionRecommendation {
        val suffix = if (isCall) "CE" else "PE"
        return OptionRecommendation(
            symbol = "NIFTY ${snapshot.expiry} ${snapshot.atmStrike} $suffix",
            strike = snapshot.atmStrike,
            expiry = snapshot.expiry,
            premium = snapshot.lastOptionPremium,
        )
    }

    private fun generateSession(date: LocalDate, base: Double): List<Candle> {
        val startHour = 9
        val startMinute = 15
        return (0 until 24).map { index ->
            val drift = index * 4.2
            val open = base + drift + if (index % 2 == 0) 3 else -2
            val close = open + if (index < 3) index * 1.5 else if (index % 3 == 0) 14.0 else -6.0
            val high = maxOf(open, close) + 8
            val low = minOf(open, close) - 6
            Candle(
                timestamp = LocalDateTime(
                    year = date.year,
                    monthNumber = date.monthNumber,
                    dayOfMonth = date.dayOfMonth,
                    hour = startHour + ((startMinute + index * 5) / 60),
                    minute = (startMinute + index * 5) % 60,
                    second = 0,
                    nanosecond = 0,
                ),
                open = open,
                high = high,
                low = low,
                close = close,
                volume = 100_000L + index * 2_500L,
            )
        }
    }

    private fun buildOptionChain(atm: Int): List<OptionQuote> {
        return (-2..2).map { step ->
            val strike = atm + (step * 50)
            OptionQuote(
                strike = strike,
                callLtp = 150.0 - (step * 8),
                putLtp = 140.0 + (step * 7),
                callOi = 2_500_000L + step * 100_000L,
                putOi = 2_400_000L - step * 90_000L,
                callChangeOi = 40_000L + step * 2_000L,
                putChangeOi = 38_000L - step * 2_000L,
                callIv = 12.3 + step,
                putIv = 13.2 - step,
            )
        }
    }
}

abstract class StubBrokerProvider(
    final override val type: DataProviderType,
    private val label: String,
) : MarketDataProvider {
    private val delegate = DemoNseProvider()

    override suspend fun fetchSnapshot(): MarketSnapshot = delegate.fetchSnapshot().copy(provider = type)

    override suspend fun fetchHistoricalSnapshots(days: Int): List<MarketSnapshot> =
        delegate.fetchHistoricalSnapshots(days).map { it.copy(provider = type) }

    override suspend fun resolveAtmOption(snapshot: MarketSnapshot, isCall: Boolean): OptionRecommendation? =
        delegate.resolveAtmOption(snapshot, isCall)?.copy(symbol = "$label ${snapshot.atmStrike} ${if (isCall) "CE" else "PE"}")
}

class UpstoxProvider : StubBrokerProvider(DataProviderType.UPSTOX, "UPSTOX NIFTY")
class ZerodhaKiteProvider : StubBrokerProvider(DataProviderType.ZERODHA, "KITE NIFTY")
class AngelOneProvider : StubBrokerProvider(DataProviderType.ANGEL_ONE, "ANGEL NIFTY")
