package com.example.niftyorbassistant.domain

import com.example.niftyorbassistant.domain.model.BacktestRange
import com.example.niftyorbassistant.domain.model.BacktestResult
import com.example.niftyorbassistant.domain.model.MarketSnapshot
import com.example.niftyorbassistant.domain.model.Settings

object BacktestEngine {
    fun run(range: BacktestRange, snapshots: List<MarketSnapshot>, settings: Settings): BacktestResult {
        val generatedSignals = snapshots.mapNotNull { snapshot ->
            SignalEngine.evaluate(
                snapshot = snapshot,
                settings = settings,
                existingSignal = null,
                recommendation = null,
            )
        }

        val wins = generatedSignals.count { it.target - it.entry > it.entry - it.stopLoss }
        val losses = generatedSignals.size - wins
        val netPoints = generatedSignals.sumOf { it.target - it.entry - (it.entry - it.stopLoss) / 2.0 }
        val avgRr = generatedSignals.map { it.riskRewardRatio }.average().takeIf { !it.isNaN() } ?: 0.0

        return BacktestResult(
            range = range,
            totalSignals = generatedSignals.size,
            wins = wins,
            losses = losses,
            winRate = if (generatedSignals.isEmpty()) 0.0 else wins * 100.0 / generatedSignals.size,
            netPoints = netPoints,
            averageRr = avgRr,
        )
    }
}
