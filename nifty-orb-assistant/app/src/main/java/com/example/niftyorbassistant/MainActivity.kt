package com.example.niftyorbassistant

import android.Manifest
import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.niftyorbassistant.ui.NiftyOrbApp
import com.example.niftyorbassistant.ui.theme.NiftyOrbTheme
import com.example.niftyorbassistant.viewmodel.AppViewModel
import com.example.niftyorbassistant.viewmodel.AppViewModelFactory

class MainActivity : ComponentActivity() {
    private val notificationPermissionLauncher =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) {}

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            val app = application as NiftyOrbApplication
            val viewModel = androidx.lifecycle.viewmodel.compose.viewModel<AppViewModel>(
                factory = AppViewModelFactory(app.container.repository),
            )
            val state by viewModel.uiState.collectAsStateWithLifecycle()
            val context = LocalContext.current

            LaunchedEffect(Unit) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                    notificationPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
                }
                viewModel.refresh(force = false)
            }

            NiftyOrbTheme {
                NiftyOrbApp(
                    state = state,
                    onRefresh = { viewModel.refresh(force = true) },
                    onSaveSettings = viewModel::saveSettings,
                    onExportHistory = { viewModel.exportHistory(context) },
                    onRunBacktest = viewModel::runBacktest,
                    onProviderChange = viewModel::setProvider,
                )
            }
        }
    }
}
