import { AlertColor } from '@mui/material'
import React from 'react'

export interface IAppContext {
    notify?: (message: string, severity: AlertColor) => void
}

const AppContext = React.createContext<IAppContext>({})

export default AppContext
