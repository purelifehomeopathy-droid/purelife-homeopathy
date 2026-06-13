package com.example.niftyorbassistant.domain.model

import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime

enum class MarketStatus {
    PRE_OPEN,
    OPEN,
    CLOSED,
}

enum class SignalType {
    BUY_CE,
    BUY_PE,
    NONE,
}

enum class DataProviderType {
    NSE,
    UPSTOX,
    ZERODHA,
    ANGEL_ONE,
}

enum class BacktestRange(val label: String, val days: Int) {
    DAYS_30("Last 30 Days", 30),
    DAYS_90("Last 90 Days", 90),
    DAYS_365("Last 1 Year", 365),
}

data class Candle(
    val timestamp: LocalDateTime,
    val open: Double,
    val high: Double,
    val low: Double,
    val close: Double,
    val volume: Long,
)

data class OptionQuote(
    val strike: Int,
    val callLtp: Double,
    val putLtp: Double,
    val callOi: Long,
    val putOi: Long,
    val callChangeOi: Long,
    val putChangeOi: Long,
    val callIv: Double,
    val putIv: Double,
)

data class OptionRecommendation(
    val symbol: String,
    val strike: Int,
    val expiry: String,
    val premium: Double,
)

data class OrbLevels(
    val high: Double,
    val low: Double,
)

data class Settings(
    val stopLossPoints: Double = 15.0,
    val targetPoints: Double = 32.0,
    val emaLength: Int = 20,
    val breakoutBuffer: Double = 5.0,
)

data class TradingSignal(
    val id: Long = 0L,
    val date: LocalDate,
    val type: SignalType,
    val signalTime: LocalDateTime,
    val spotPrice: Double,
    val strike: Int,
    val expiry: String,
    val entry: Double,
    val stopLoss: Double,
    val target: Double,
    val riskRewardRatio: Double,
    val optionSymbol: String,
    val provider: DataProviderType,
)

data class BacktestResult(
    val range: BacktestRange,
    val totalSignals: Int,
    val wins: Int,
    val losses: Int,
    val winRate: Double,
    val netPoints: Double,
    val averageRr: Double,
)

data class MarketSnapshot(
    val provider: DataProviderType,
    val timestamp: LocalDateTime,
    val marketStatus: MarketStatus,
    val livePrice: Double,
    val lastClose: Double,
    val previousDayHigh: Double,
    val previousDayLow: Double,
    val currentDayHigh: Double,
    val currentDayLow: Double,
    val vwap: Double,
    val ema20: Double,
    val atmStrike: Int,
    val expiry: String,
    val lastOptionPremium: Double,
    val optionChainSupported: Boolean,
    val optionChain: List<OptionQuote>,
    val candles5m: List<Candle>,
    val orbLevels: OrbLevels?,
    val lastSignal: TradingSignal? = null,
)
