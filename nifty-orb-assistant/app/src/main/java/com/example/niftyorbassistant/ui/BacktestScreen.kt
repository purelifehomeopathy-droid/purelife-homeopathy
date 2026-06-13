package com.example.niftyorbassistant.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp
import com.example.niftyorbassistant.domain.model.BacktestRange
import com.example.niftyorbassistant.viewmodel.AppUiState

@Composable
fun BacktestScreen(
    state: AppUiState,
    onRunBacktest: (BacktestRange) -> Unit,
) {
    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text("Backtesting", style = MaterialTheme.typography.headlineMedium)
        }
        item {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                BacktestRange.entries.forEach { range ->
                    Button(onClick = { onRunBacktest(range) }) {
                        Text(range.label)
                    }
                }
            }
        }
        state.backtestResult?.let { result ->
            item {
                SectionCard("Result") {
                    LabeledValue("Total Signals", result.totalSignals.toString())
                    LabeledValue("Wins", result.wins.toString())
                    LabeledValue("Losses", result.losses.toString())
                    LabeledValue("Win Rate", "${result.winRate}%")
                    LabeledValue("Net Points", result.netPoints.toString())
                    LabeledValue("Average RR", result.averageRr.toString())
                }
            }
        }
    }
}
