package com.example.niftyorbassistant.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import com.example.niftyorbassistant.data.local.dao.MarketSnapshotDao
import com.example.niftyorbassistant.data.local.dao.SettingsDao
import com.example.niftyorbassistant.data.local.dao.SignalDao
import com.example.niftyorbassistant.data.local.entity.MarketSnapshotEntity
import com.example.niftyorbassistant.data.local.entity.SettingsEntity
import com.example.niftyorbassistant.data.local.entity.SignalEntity

@Database(
    entities = [MarketSnapshotEntity::class, SignalEntity::class, SettingsEntity::class],
    version = 1,
    exportSchema = true,
)
abstract class AppDatabase : RoomDatabase() {
    abstract fun marketSnapshotDao(): MarketSnapshotDao
    abstract fun signalDao(): SignalDao
    abstract fun settingsDao(): SettingsDao

    companion object {
        fun build(context: Context): AppDatabase =
            Room.databaseBuilder(context, AppDatabase::class.java, "nifty_orb.db").build()
    }
}
