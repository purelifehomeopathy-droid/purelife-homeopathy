package com.example.niftyorbassistant.data

import android.content.Context
import com.example.niftyorbassistant.data.local.AppDatabase
import com.example.niftyorbassistant.data.remote.AngelOneProvider
import com.example.niftyorbassistant.data.remote.DemoNseProvider
import com.example.niftyorbassistant.data.remote.MarketDataProvider
import com.example.niftyorbassistant.data.remote.UpstoxProvider
import com.example.niftyorbassistant.data.remote.ZerodhaKiteProvider
import com.example.niftyorbassistant.notifications.NotificationHelper
import com.example.niftyorbassistant.repository.MarketRepository

class AppContainer(context: Context) {
    private val database = AppDatabase.build(context)
    private val providers: Map<com.example.niftyorbassistant.domain.model.DataProviderType, MarketDataProvider> = listOf(
        DemoNseProvider(),
        UpstoxProvider(),
        ZerodhaKiteProvider(),
        AngelOneProvider(),
    ).associateBy { it.type }

    val repository = MarketRepository(
        context = context,
        signalDao = database.signalDao(),
        snapshotDao = database.marketSnapshotDao(),
        settingsDao = database.settingsDao(),
        providers = providers,
        notificationHelper = NotificationHelper,
    )
}
