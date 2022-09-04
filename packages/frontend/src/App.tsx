import { ThemeProvider, createTheme } from '@mui/material'
import { Colors } from './lib/colors'
import { AppContainer } from './lib/app-container'
import { Home } from './pages/home'

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.secondary.dark
        }
    }
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppContainer>
                <Home />
            </AppContainer>
        </ThemeProvider>
    )
}

export default App
