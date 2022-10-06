import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import * as Sentry from '@sentry/react'
import { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { AppContainer } from './lib/app/app-container'
import usePersistedState from './lib/hooks/use-persisted-state'
import { Home } from './pages/home'
import { LandingPage } from './pages/landing-page'
import {
    darkThemeMui,
    muiThemeDefault,
    dark,
    light,
    GlobalStyle
} from './styles'

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes)

export const App = () => {
    const [appTheme, setAppTheme] = usePersistedState<DefaultTheme>(
        'theme',
        light
    )

    const getUiTheme = useMemo(
        () => (appTheme.title === 'light' ? muiThemeDefault : darkThemeMui),
        [appTheme.title]
    )

    const toggleTheme = () => {
        setAppTheme(appTheme.title === 'light' ? dark : light)
    }

    return (
        <MuiThemeProvider theme={getUiTheme}>
            <ThemeProvider theme={appTheme}>
                <GlobalStyle />
                <AppContainer>
                    <SentryRoutes>
                        <Route
                            path='/'
                            element={<Home handleChangeTheme={toggleTheme} />}
                        />
                        <Route
                            path='/:key'
                            element={
                                <LandingPage handleChangeTheme={toggleTheme} />
                            }
                        />
                    </SentryRoutes>
                </AppContainer>
            </ThemeProvider>
        </MuiThemeProvider>
    )
}

export default App
