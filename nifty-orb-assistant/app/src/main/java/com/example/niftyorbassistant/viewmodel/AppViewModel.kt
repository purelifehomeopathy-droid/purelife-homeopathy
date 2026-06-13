package com.example.niftyorbassistant.viewmodel

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.niftyorbassistant.domain.MarketHoursUtil
import com.example.niftyorbassistant.domain.model.BacktestRange
import com.example.niftyorbassistant.domain.model.BacktestResult
import com.example.niftyorbassistant.domain.model.DataProviderType
import com.example.niftyorbassistant.domain.model.MarketSnapshot
import com.example.niftyorbassistant.domain.model.Settings
import com.example.niftyorbassistant.domain.model.TradingSignal
import com.example.niftyorbassistant.repository.MarketRepository
import com.example.niftyorbassistant.util.CsvExporter
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class AppUiState(
    val snapshot: MarketSnapshot? = null,
    val settings: Settings = Settings(),
    val signals: List<TradingSignal> = emptyList(),
    val provider: DataProviderType = DataProviderType.NSE,
    val loading: Boolean = false,
    val error: String? = null,
    val backtestResult: BacktestResult? = null,
    val marketCountdown: String = MarketHoursUtil.nextMarketOpenLabel(),
    val disclaimer: String = "This application is for educational and informational purposes only. It does not provide investment advice and does not execute trades.",
)

class AppViewModel(
    private val repository: MarketRepository,
) : ViewModel() {
    private val loading = MutableStateFlow(false)
    private val error = MutableStateFlow<String?>(null)
    private val backtest = MutableStateFlow<BacktestResult?>(null)

    val uiState: StateFlow<AppUiState> = combine(
        repository.state,
        loading,
        error,
        backtest,
    ) { repo, loadingState, errorState, backtestState ->
        AppUiState(
            snapshot = repo.snapshot,
            settings = repo.settings,
            signals = repo.signals,
            provider = repo.provider,
            loading = loadingState,
            error = errorState,
            backtestResult = backtestState,
        )
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = AppUiState(),
    )

    fun refresh(force: Boolean) {
        viewModelScope.launch {
            loading.value = true
            error.value = repository.refresh(force).exceptionOrNull()?.message
            loading.value = false
        }
    }

    fun saveSettings(settings: Settings) {
        viewModelScope.launch {
            repository.saveSettings(settings)
        }
    }

    fun runBacktest(range: BacktestRange) {
        viewModelScope.launch {
            backtest.value = repository.runBacktest(range, uiState.value.settings)
        }
    }

    fun exportHistory(context: Context) {
        viewModelScope.launch {
            CsvExporter.share(context, repository.exportHistory())
        }
    }

    fun setProvider(type: DataProviderType) {
        viewModelScope.launch {
            repository.setProvider(type)
            refresh(force = true)
        }
    }
}

class AppViewModelFactory(
    private val repository: MarketRepository,
) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T = AppViewModel(repository) as T
}
