package com.example.niftyorbassistant.data.local.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.niftyorbassistant.data.local.entity.MarketSnapshotEntity
import com.example.niftyorbassistant.data.local.entity.SettingsEntity
import com.example.niftyorbassistant.data.local.entity.SignalEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface MarketSnapshotDao {
    @Query("SELECT * FROM market_snapshots WHERE id = 1")
    fun observe(): Flow<MarketSnapshotEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(entity: MarketSnapshotEntity)
}

@Dao
interface SignalDao {
    @Query("SELECT * FROM signals ORDER BY signalTime DESC")
    fun observeAll(): Flow<List<SignalEntity>>

    @Query("SELECT * FROM signals WHERE tradeDate = :tradeDate LIMIT 1")
    suspend fun signalForDate(tradeDate: String): SignalEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(signal: SignalEntity): Long
}

@Dao
interface SettingsDao {
    @Query("SELECT * FROM settings WHERE id = 1")
    fun observe(): Flow<SettingsEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(entity: SettingsEntity)
}
