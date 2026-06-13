package com.example.niftyorbassistant.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.AssistChip
import androidx.compose.material3.AssistChipDefaults
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.niftyorbassistant.domain.model.DataProviderType
import com.example.niftyorbassistant.domain.model.SignalType
import com.example.niftyorbassistant.ui.theme.GreenBull
import com.example.niftyorbassistant.ui.theme.GreyNeutral
import com.example.niftyorbassistant.ui.theme.RedBear
import com.example.niftyorbassistant.viewmodel.AppUiState

@Composable
fun DashboardScreen(
    state: AppUiState,
    onRefresh: () -> Unit,
    onProviderChange: (DataProviderType) -> Unit,
) {
    val snapshot = state.snapshot
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        item {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text("Nifty ORB Assistant", style = MaterialTheme.typography.headlineMedium)
                Text(state.disclaimer, style = MaterialTheme.typography.bodyMedium, color = GreyNeutral)
                FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    DataProviderType.entries.forEach { provider ->
                        AssistChip(
                            onClick = { onProviderChange(provider) },
                            label = { Text(provider.name.replace('_', ' ')) },
                            colors = AssistChipDefaults.assistChipColors(
                                containerColor = if (provider == state.provider) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceContainerHigh,
                            ),
                        )
                    }
                }
                Button(onClick = onRefresh) { Text(if (state.loading) "Refreshing..." else "Refresh Now") }
            }
        }

        item {
            FlowRow(
                modifier = Modifier.fillMaxWidth(),
                maxItemsInEachRow = 2,
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                MetricCard("Live Nifty Price", "${snapshot?.livePrice ?: "--"}", tone = GreenBull, modifier = Modifier.weight(1f, true))
                MetricCard("ORB High", "${snapshot?.orbLevels?.high ?: "--"}", tone = GreenBull, modifier = Modifier.weight(1f, true))
                MetricCard("ORB Low", "${snapshot?.orbLevels?.low ?: "--"}", tone = RedBear, modifier = Modifier.weight(1f, true))
                MetricCard("VWAP", "${snapshot?.vwap ?: "--"}", tone = GreyNeutral, modifier = Modifier.weight(1f, true))
                MetricCard("EMA20", "${snapshot?.ema20 ?: "--"}", tone = GreyNeutral, modifier = Modifier.weight(1f, true))
                MetricCard("ATM Strike", "${snapshot?.atmStrike ?: "--"}", tone = GreyNeutral, modifier = Modifier.weight(1f, true))
                MetricCard("Current Expiry", snapshot?.expiry ?: "--", tone = GreyNeutral, modifier = Modifier.weight(1f, true))
                MetricCard("Market Status", snapshot?.marketStatus?.name ?: "--", tone = GreyNeutral, modifier = Modifier.weight(1f, true))
            }
        }

        item {
            SectionCard("Signal Snapshot") {
                val lastSignal = state.signals.firstOrNull()
                LabeledValue("Last Signal", lastSignal?.type?.name ?: "No signal")
                LabeledValue("Signal Time", lastSignal?.signalTime?.toString() ?: "--")
                LabeledValue("Spot Price", lastSignal?.spotPrice?.toString() ?: "--")
                LabeledValue("Entry / SL / Target", lastSignal?.let { "${it.entry} / ${it.stopLoss} / ${it.target}" } ?: "--")
                LabeledValue("Countdown", state.marketCountdown)
            }
        }

        if (snapshot != null) {
            item {
                SectionCard("Market Closed View") {
                    LabeledValue("Last Close", snapshot.lastClose.toString())
                    LabeledValue("Prev Day High", snapshot.previousDayHigh.toString())
                    LabeledValue("Prev Day Low", snapshot.previousDayLow.toString())
                    LabeledValue("Current Day High", snapshot.currentDayHigh.toString())
                    LabeledValue("Current Day Low", snapshot.currentDayLow.toString())
                }
            }
        }
    }
}
