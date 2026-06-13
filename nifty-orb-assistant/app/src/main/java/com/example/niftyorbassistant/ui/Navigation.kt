package com.example.niftyorbassistant.ui

sealed class AppDestination(val route: String, val label: String) {
    data object Dashboard : AppDestination("dashboard", "Dashboard")
    data object OptionChain : AppDestination("option_chain", "Option Chain")
    data object History : AppDestination("history", "History")
    data object Backtest : AppDestination("backtest", "Backtest")
    data object Settings : AppDestination("settings", "Settings")
}
