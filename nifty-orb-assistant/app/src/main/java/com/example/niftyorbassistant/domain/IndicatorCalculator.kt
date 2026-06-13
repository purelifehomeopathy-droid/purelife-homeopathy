package com.example.niftyorbassistant.domain

import com.example.niftyorbassistant.domain.model.Candle
import com.example.niftyorbassistant.domain.model.OrbLevels
import kotlin.math.abs

object IndicatorCalculator {
    fun calculateOrbLevels(candles: List<Candle>): OrbLevels? {
        val openingRange = candles.take(3)
        if (openingRange.size < 3) return null
        return OrbLevels(
            high = openingRange.maxOf { it.high },
            low = openingRange.minOf { it.low },
        )
    }

    fun calculateEma(candles: List<Candle>, length: Int): Double {
        if (candles.isEmpty()) return 0.0
        val multiplier = 2.0 / (length + 1)
        return candles.map { it.close }.drop(1).fold(candles.first().close) { ema, close ->
            (close - ema) * multiplier + ema
        }
    }

    fun calculateVwap(candles: List<Candle>): Double {
        val numerator = candles.sumOf { ((it.high + it.low + it.close) / 3.0) * it.volume.toDouble() }
        val denominator = candles.sumOf { it.volume.toDouble() }.takeIf { it > 0 } ?: return 0.0
        return numerator / denominator
    }

    fun strongBullish(candle: Candle): Boolean = bodyPercent(candle) >= 50.0 && candle.close > candle.open

    fun strongBearish(candle: Candle): Boolean = bodyPercent(candle) >= 50.0 && candle.close < candle.open

    fun bodyPercent(candle: Candle): Double {
        val range = candle.high - candle.low
        if (range <= 0.0) return 0.0
        return abs(candle.close - candle.open) / range * 100.0
    }
}
