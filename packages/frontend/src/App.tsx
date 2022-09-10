import { ThemeProvider, createTheme } from '@mui/material'
import { Colors } from './lib/colors'
import { Home } from './pages/home'
import { AppContainer } from './lib/app/app-container'
import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/landing-page'

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary
        },
        text: {
            primary: Colors.primary
        }
    }
})

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppContainer>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/:key' element={<LandingPage />} />
                </Routes>
            </AppContainer>
        </ThemeProvider>
    )
}

export default App
