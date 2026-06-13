package com.example.niftyorbassistant.work

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkerParameters
import com.example.niftyorbassistant.NiftyOrbApplication
import com.example.niftyorbassistant.domain.MarketHoursUtil
import com.example.niftyorbassistant.domain.model.MarketStatus
import com.example.niftyorbassistant.notifications.NotificationHelper
import java.util.concurrent.TimeUnit

class MarketRefreshWorker(
    appContext: Context,
    params: WorkerParameters,
) : CoroutineWorker(appContext, params) {
    override suspend fun doWork(): Result {
        val app = applicationContext as NiftyOrbApplication
        val status = MarketHoursUtil.marketStatus()
        when (status) {
            MarketStatus.OPEN -> NotificationHelper.sendMarketOpenNotification(applicationContext)
            MarketStatus.CLOSED -> NotificationHelper.sendMarketCloseNotification(applicationContext)
            MarketStatus.PRE_OPEN -> Unit
        }
        return app.container.repository.refresh(force = false)
            .fold(
                onSuccess = { Result.success() },
                onFailure = { Result.retry() },
            )
    }
}

object WorkScheduler {
    private const val WORK_NAME = "market_refresh"

    fun scheduleMarketRefresh(context: Context) {
        val request = PeriodicWorkRequestBuilder<MarketRefreshWorker>(15, TimeUnit.MINUTES).build()
        WorkManager.getInstance(context).enqueueUniquePeriodicWork(
            WORK_NAME,
            ExistingPeriodicWorkPolicy.UPDATE,
            request,
        )
    }
}
