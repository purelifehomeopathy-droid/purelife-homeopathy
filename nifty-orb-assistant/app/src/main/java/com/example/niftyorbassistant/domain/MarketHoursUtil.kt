package com.example.niftyorbassistant.domain

import com.example.niftyorbassistant.domain.model.MarketStatus
import java.time.DayOfWeek
import java.time.Duration
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

object MarketHoursUtil {
    private val zone: ZoneId = ZoneId.of("Asia/Kolkata")

    fun marketStatus(now: ZonedDateTime = ZonedDateTime.now(zone)): MarketStatus {
        if (now.dayOfWeek == DayOfWeek.SATURDAY || now.dayOfWeek == DayOfWeek.SUNDAY) {
            return MarketStatus.CLOSED
        }
        val minutes = now.hour * 60 + now.minute
        return when {
            minutes < 9 * 60 + 15 -> MarketStatus.PRE_OPEN
            minutes <= 15 * 60 + 30 -> MarketStatus.OPEN
            else -> MarketStatus.CLOSED
        }
    }

    fun nextMarketOpenLabel(now: ZonedDateTime = ZonedDateTime.now(zone)): String {
        var cursor = now
        while (true) {
            val marketOpen = cursor.withHour(9).withMinute(15).withSecond(0).withNano(0)
            val validDay = marketOpen.dayOfWeek != DayOfWeek.SATURDAY && marketOpen.dayOfWeek != DayOfWeek.SUNDAY
            if (validDay && marketOpen.isAfter(now)) {
                val duration = Duration.between(now, marketOpen)
                val hours = duration.toHours()
                val minutes = duration.minusHours(hours).toMinutes()
                return "${hours}h ${minutes}m to ${marketOpen.format(DateTimeFormatter.ofPattern("EEE, d MMM 9:15 a"))}"
            }
            cursor = cursor.plusDays(1)
        }
    }
}
