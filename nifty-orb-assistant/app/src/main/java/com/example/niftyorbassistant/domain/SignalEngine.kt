package com.example.niftyorbassistant.domain

import com.example.niftyorbassistant.domain.model.Candle
import com.example.niftyorbassistant.domain.model.MarketSnapshot
import com.example.niftyorbassistant.domain.model.MarketStatus
import com.example.niftyorbassistant.domain.model.OptionRecommendation
import com.example.niftyorbassistant.domain.model.Settings
import com.example.niftyorbassistant.domain.model.SignalType
import com.example.niftyorbassistant.domain.model.TradingSignal
import java.time.LocalTime
import java.time.ZoneId
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toJavaLocalDate
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime

object SignalEngine {
    private val zoneId: ZoneId = ZoneId.of("Asia/Kolkata")

    fun evaluate(
        snapshot: MarketSnapshot,
        settings: Settings,
        existingSignal: TradingSignal?,
        recommendation: OptionRecommendation?,
    ): TradingSignal? {
        if (snapshot.marketStatus != MarketStatus.OPEN) return null
        if (existingSignal != null) return null

        val latestCandle = snapshot.candles5m.lastOrNull() ?: return null
        val orb = snapshot.orbLevels ?: return null
        val localTime = latestCandle.timestamp.toJavaLocalDateTime().toLocalTime()
        if (localTime.isBefore(LocalTime.of(9, 30))) return null

        return when {
            matchesCe(latestCandle, snapshot, settings, orb.high) -> buildSignal(snapshot, latestCandle, SignalType.BUY_CE, recommendation)
            matchesPe(latestCandle, snapshot, settings, orb.low) -> buildSignal(snapshot, latestCandle, SignalType.BUY_PE, recommendation)
            else -> null
        }
    }

    private fun matchesCe(candle: Candle, snapshot: MarketSnapshot, settings: Settings, orbHigh: Double): Boolean {
        return candle.close > orbHigh &&
            candle.close > snapshot.vwap &&
            candle.close > snapshot.ema20 &&
            IndicatorCalculator.strongBullish(candle) &&
            candle.close >= orbHigh + settings.breakoutBuffer
    }

    private fun matchesPe(candle: Candle, snapshot: MarketSnapshot, settings: Settings, orbLow: Double): Boolean {
        return candle.close < orbLow &&
            candle.close < snapshot.vwap &&
            candle.close < snapshot.ema20 &&
            IndicatorCalculator.strongBearish(candle) &&
            candle.close <= orbLow - settings.breakoutBuffer
    }

    private fun buildSignal(
        snapshot: MarketSnapshot,
        candle: Candle,
        type: SignalType,
        recommendation: OptionRecommendation?,
    ): TradingSignal {
        val entry = recommendation?.premium ?: snapshot.lastOptionPremium
        val stopLoss = entry - 15.0
        val target = entry + 32.0
        return TradingSignal(
            date = candle.timestamp.date,
            type = type,
            signalTime = candle.timestamp,
            spotPrice = candle.close,
            strike = recommendation?.strike ?: snapshot.atmStrike,
            expiry = recommendation?.expiry ?: snapshot.expiry,
            entry = entry,
            stopLoss = stopLoss,
            target = target,
            riskRewardRatio = if (entry - stopLoss == 0.0) 0.0 else (target - entry) / (entry - stopLoss),
            optionSymbol = recommendation?.symbol ?: "NIFTY ${snapshot.expiry} ${snapshot.atmStrike} ${if (type == SignalType.BUY_CE) "CE" else "PE"}",
            provider = snapshot.provider,
        )
    }
}
