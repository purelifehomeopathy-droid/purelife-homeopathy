package com.example.niftyorbassistant.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp
import com.example.niftyorbassistant.viewmodel.AppUiState

@Composable
fun HistoryScreen(
    state: AppUiState,
    onExportHistory: () -> Unit,
) {
    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text("History", style = MaterialTheme.typography.headlineMedium)
        }
        item {
            Button(onClick = onExportHistory) {
                Text("Export CSV")
            }
        }
        items(state.signals) { signal ->
            SectionCard("${signal.date} • ${signal.type.name}") {
                LabeledValue("Spot Price", signal.spotPrice.toString())
                LabeledValue("Strike", signal.strike.toString())
                LabeledValue("Entry", signal.entry.toString())
                LabeledValue("SL", signal.stopLoss.toString())
                LabeledValue("Target", signal.target.toString())
                LabeledValue("RR", signal.riskRewardRatio.toString())
            }
        }
    }
}
