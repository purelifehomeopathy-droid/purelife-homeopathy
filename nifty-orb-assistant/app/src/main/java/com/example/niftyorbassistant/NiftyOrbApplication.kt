package com.example.niftyorbassistant

import android.app.Application
import androidx.work.Configuration
import com.example.niftyorbassistant.data.AppContainer
import com.example.niftyorbassistant.notifications.NotificationHelper
import com.example.niftyorbassistant.work.WorkScheduler

class NiftyOrbApplication : Application(), Configuration.Provider {
    lateinit var container: AppContainer
        private set

    override fun onCreate() {
        super.onCreate()
        NotificationHelper.createChannels(this)
        container = AppContainer(this)
        WorkScheduler.scheduleMarketRefresh(this)
    }

    override val workManagerConfiguration: Configuration
        get() = Configuration.Builder().setMinimumLoggingLevel(android.util.Log.INFO).build()
}
