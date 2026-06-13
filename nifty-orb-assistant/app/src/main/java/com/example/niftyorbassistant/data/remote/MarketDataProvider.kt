package com.example.niftyorbassistant.data.remote

import com.example.niftyorbassistant.domain.model.DataProviderType
import com.example.niftyorbassistant.domain.model.MarketSnapshot
import com.example.niftyorbassistant.domain.model.OptionRecommendation

interface MarketDataProvider {
    val type: DataProviderType

    suspend fun fetchSnapshot(): MarketSnapshot

    suspend fun fetchHistoricalSnapshots(days: Int): List<MarketSnapshot>

    suspend fun resolveAtmOption(snapshot: MarketSnapshot, isCall: Boolean): OptionRecommendation?
}
