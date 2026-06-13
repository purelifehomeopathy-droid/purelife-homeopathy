package com.example.niftyorbassistant.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val DarkScheme = darkColorScheme(
    primary = BlueAccent,
    secondary = GreenBull,
    tertiary = RedBear,
    background = DarkBg,
    surface = DarkSurface,
)

private val LightScheme = lightColorScheme(
    primary = BlueAccent,
    secondary = GreenBull,
    tertiary = RedBear,
)

@Composable
fun NiftyOrbTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkScheme else LightScheme,
        typography = Typography,
        content = content,
    )
}
