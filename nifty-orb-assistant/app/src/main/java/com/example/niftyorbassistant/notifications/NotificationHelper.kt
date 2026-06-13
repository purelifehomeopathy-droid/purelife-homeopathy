package com.example.niftyorbassistant.notifications

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.example.niftyorbassistant.R
import com.example.niftyorbassistant.domain.model.OrbLevels
import com.example.niftyorbassistant.domain.model.SignalType
import com.example.niftyorbassistant.domain.model.TradingSignal

object NotificationHelper {
    private const val CHANNEL_MARKET = "market_updates"
    private const val CHANNEL_SIGNAL = "signal_updates"

    fun createChannels(context: Context) {
        val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        val marketChannel = NotificationChannel(CHANNEL_MARKET, "Market Updates", NotificationManager.IMPORTANCE_DEFAULT)
        val signalChannel = NotificationChannel(CHANNEL_SIGNAL, "Signal Alerts", NotificationManager.IMPORTANCE_HIGH)
        manager.createNotificationChannel(marketChannel)
        manager.createNotificationChannel(signalChannel)
    }

    fun sendOrbNotification(context: Context, orbLevels: OrbLevels) {
        send(context, CHANNEL_MARKET, 1002, "ORB Calculated", "High ${orbLevels.high} | Low ${orbLevels.low}")
    }

    fun sendSignalNotification(context: Context, signal: TradingSignal) {
        val title = if (signal.type == SignalType.BUY_CE) "BUY CE Signal Generated" else "BUY PE Signal Generated"
        send(context, CHANNEL_SIGNAL, 1003, title, "${signal.optionSymbol} @ ${signal.entry}")
    }

    fun sendMarketOpenNotification(context: Context) {
        send(context, CHANNEL_MARKET, 1000, "Market Open", "Nifty ORB Assistant is monitoring today's setup.")
    }

    fun sendMarketCloseNotification(context: Context) {
        send(context, CHANNEL_MARKET, 1001, "Market Close", "Live monitoring has ended for the trading day.")
    }

    private fun send(context: Context, channel: String, id: Int, title: String, body: String) {
        val notification = NotificationCompat.Builder(context, channel)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(title)
            .setContentText(body)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setAutoCancel(true)
            .build()
        NotificationManagerCompat.from(context).notify(id, notification)
    }
}
