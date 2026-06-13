package com.example.niftyorbassistant.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Analytics
import androidx.compose.material.icons.outlined.CandlestickChart
import androidx.compose.material.icons.outlined.History
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material.icons.outlined.ShowChart
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.niftyorbassistant.domain.model.BacktestRange
import com.example.niftyorbassistant.domain.model.DataProviderType
import com.example.niftyorbassistant.domain.model.Settings
import com.example.niftyorbassistant.viewmodel.AppUiState

@Composable
fun NiftyOrbApp(
    state: AppUiState,
    onRefresh: () -> Unit,
    onSaveSettings: (Settings) -> Unit,
    onExportHistory: () -> Unit,
    onRunBacktest: (BacktestRange) -> Unit,
    onProviderChange: (DataProviderType) -> Unit,
) {
    val navController = rememberNavController()
    val snackbarHostState = remember { SnackbarHostState() }
    val destinations = listOf(
        AppDestination.Dashboard,
        AppDestination.OptionChain,
        AppDestination.History,
        AppDestination.Backtest,
        AppDestination.Settings,
    )

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) },
        bottomBar = {
            NavigationBar {
                val currentRoute = navController.currentBackStackEntryAsState().value?.destination?.route
                destinations.forEach { item ->
                    NavigationBarItem(
                        selected = currentRoute == item.route,
                        onClick = { navController.navigate(item.route) },
                        icon = {
                            Icon(
                                imageVector = when (item) {
                                    AppDestination.Dashboard -> Icons.Outlined.CandlestickChart
                                    AppDestination.OptionChain -> Icons.Outlined.ShowChart
                                    AppDestination.History -> Icons.Outlined.History
                                    AppDestination.Backtest -> Icons.Outlined.Analytics
                                    AppDestination.Settings -> Icons.Outlined.Settings
                                },
                                contentDescription = item.label,
                            )
                        },
                        label = { Text(item.label) },
                    )
                }
            }
        },
    ) { padding ->
        NavHost(
            navController = navController,
            startDestination = AppDestination.Dashboard.route,
            modifier = Modifier.padding(padding),
        ) {
            composable(AppDestination.Dashboard.route) {
                DashboardScreen(state = state, onRefresh = onRefresh, onProviderChange = onProviderChange)
            }
            composable(AppDestination.OptionChain.route) {
                OptionChainScreen(state = state)
            }
            composable(AppDestination.History.route) {
                HistoryScreen(state = state, onExportHistory = onExportHistory)
            }
            composable(AppDestination.Backtest.route) {
                BacktestScreen(state = state, onRunBacktest = onRunBacktest)
            }
            composable(AppDestination.Settings.route) {
                SettingsScreen(state = state, onSaveSettings = onSaveSettings)
            }
        }
    }
}
