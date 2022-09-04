import { ThemeProvider, createTheme } from '@mui/material'
import { Colors } from './lib/colors'
import { Home } from './pages/home'
import { AppContainer } from './lib/app-container'

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.secondary.dark
        }
    }
})

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppContainer>
                <Home />
            </AppContainer>
        </ThemeProvider>
    )
}

export default App
