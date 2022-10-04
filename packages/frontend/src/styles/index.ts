export { GlobalStyle } from './global'
export * from './themes/dark'
export * from './themes/light'
import { createTheme } from '@mui/material'
import { Colors } from '../lib/colors'

export const muiThemeDefault = createTheme({
    palette: {
        primary: {
            main: Colors.primary
        },
        text: {
            primary: Colors.primary
        }
    }
})

export const darkThemeMui = {
    ...muiThemeDefault,
    palette: {
        ...muiThemeDefault.palette,
        mode: 'dark',
        background: { default: '#363636' },
        text: {
            primary: '#fff'
        }
    }
}
