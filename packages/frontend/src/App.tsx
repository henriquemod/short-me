import { ThemeProvider, createTheme } from '@mui/material'
import { Colors } from './lib/colors'
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
            <Home />
        </ThemeProvider>
    )
}

export default App
