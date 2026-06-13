package com.example.niftyorbassistant.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.example.niftyorbassistant.domain.model.DataProviderType
import com.example.niftyorbassistant.domain.model.SignalType

@Entity(tableName = "market_snapshots")
data class MarketSnapshotEntity(
    @PrimaryKey val id: Int = 1,
    val provider: DataProviderType,
    val timestamp: String,
    val marketStatus: String,
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
    val orbHigh: Double?,
    val orbLow: Double?,
    val rawCandlesJson: String,
    val rawOptionChainJson: String,
)

@Entity(tableName = "signals")
data class SignalEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val tradeDate: String,
    val type: SignalType,
    val signalTime: String,
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

@Entity(tableName = "settings")
data class SettingsEntity(
    @PrimaryKey val id: Int = 1,
    val stopLossPoints: Double,
    val targetPoints: Double,
    val emaLength: Int,
    val breakoutBuffer: Double,
)
