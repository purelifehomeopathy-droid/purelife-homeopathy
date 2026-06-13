package com.example.niftyorbassistant.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.niftyorbassistant.viewmodel.AppUiState

@Composable
fun OptionChainScreen(state: AppUiState) {
    val snapshot = state.snapshot
    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text("Option Chain", style = MaterialTheme.typography.headlineMedium)
        }
        if (snapshot?.optionChainSupported == true) {
            items(snapshot.optionChain) { quote ->
                SectionCard(title = "Strike ${quote.strike}") {
                    LabeledValue("CE LTP", quote.callLtp.toString())
                    LabeledValue("PE LTP", quote.putLtp.toString())
                    LabeledValue("CE OI", quote.callOi.toString())
                    LabeledValue("PE OI", quote.putOi.toString())
                    LabeledValue("CE Chg OI", quote.callChangeOi.toString())
                    LabeledValue("PE Chg OI", quote.putChangeOi.toString())
                    LabeledValue("CE IV", quote.callIv.toString())
                    LabeledValue("PE IV", quote.putIv.toString())
                }
            }
        } else {
            item {
                SectionCard("Not Available") {
                    Text("The selected provider does not currently expose option chain data in this build.")
                }
            }
        }
    }
}
