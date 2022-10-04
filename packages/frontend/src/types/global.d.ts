import 'styled-components'

declare module '*.svg'

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string

        colors: {
            primary: string
            secundary: string

            background: string
            text: string
        }
    }
}
