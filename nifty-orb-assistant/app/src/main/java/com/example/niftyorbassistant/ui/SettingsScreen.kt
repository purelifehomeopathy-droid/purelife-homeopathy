package com.example.niftyorbassistant.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.lazy.LazyColumn
import com.example.niftyorbassistant.domain.model.Settings
import com.example.niftyorbassistant.viewmodel.AppUiState

@Composable
fun SettingsScreen(
    state: AppUiState,
    onSaveSettings: (Settings) -> Unit,
) {
    val stopLoss = remember(state.settings.stopLossPoints) { mutableStateOf(state.settings.stopLossPoints.toString()) }
    val target = remember(state.settings.targetPoints) { mutableStateOf(state.settings.targetPoints.toString()) }
    val ema = remember(state.settings.emaLength) { mutableStateOf(state.settings.emaLength.toString()) }
    val buffer = remember(state.settings.breakoutBuffer) { mutableStateOf(state.settings.breakoutBuffer.toString()) }

    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text("Settings", style = MaterialTheme.typography.headlineMedium)
        }
        item {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                OutlinedTextField(value = stopLoss.value, onValueChange = { stopLoss.value = it }, label = { Text("Stop loss points") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = target.value, onValueChange = { target.value = it }, label = { Text("Target points") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = ema.value, onValueChange = { ema.value = it }, label = { Text("EMA length") }, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = buffer.value, onValueChange = { buffer.value = it }, label = { Text("Breakout buffer") }, modifier = Modifier.fillMaxWidth())
                Button(
                    onClick = {
                        onSaveSettings(
                            Settings(
                                stopLossPoints = stopLoss.value.toDoubleOrNull() ?: 15.0,
                                targetPoints = target.value.toDoubleOrNull() ?: 32.0,
                                emaLength = ema.value.toIntOrNull() ?: 20,
                                breakoutBuffer = buffer.value.toDoubleOrNull() ?: 5.0,
                            ),
                        )
                    },
                ) {
                    Text("Save Settings")
                }
            }
        }
    }
}
