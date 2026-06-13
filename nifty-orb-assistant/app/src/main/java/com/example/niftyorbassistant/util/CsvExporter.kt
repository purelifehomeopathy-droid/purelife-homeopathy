package com.example.niftyorbassistant.util

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.core.content.FileProvider
import com.example.niftyorbassistant.data.local.entity.SignalEntity
import java.io.File
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first

object CsvExporter {
    suspend fun exportSignals(context: Context, signalFlow: Flow<List<SignalEntity>>): Uri {
        val signals = signalFlow.first()
        val exportDir = File(context.cacheDir, "exports").apply { mkdirs() }
        val file = File(exportDir, "nifty_orb_history.csv")
        val content = buildString {
            appendLine("Date,Signal Type,Spot Price,Strike,Entry,SL,Target")
            signals.forEach { signal ->
                appendLine("${signal.tradeDate},${signal.type},${signal.spotPrice},${signal.strike},${signal.entry},${signal.stopLoss},${signal.target}")
            }
        }
        file.writeText(content)
        return FileProvider.getUriForFile(context, "${context.packageName}.fileprovider", file)
    }

    fun share(context: Context, uri: Uri) {
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/csv"
            putExtra(Intent.EXTRA_STREAM, uri)
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
        context.startActivity(Intent.createChooser(intent, "Export Signal History"))
    }
}
