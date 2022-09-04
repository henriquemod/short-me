import {
    Alert,
    AlertColor,
    AlertProps,
    Snackbar,
    SnackbarProps
} from '@mui/material'
import { useCallback, useState } from 'react'

interface ISnack
    extends Pick<AlertProps, 'severity'>,
        Pick<
            SnackbarProps,
            'open' | 'message' | 'anchorOrigin' | 'autoHideDuration'
        > {
    shotUrl: string
}

const DEFAULT_SNACK_STATE: ISnack = {
    message: null,
    open: false,
    severity: 'error',
    autoHideDuration: 2000,
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    shotUrl: ''
}

export const useNotification = () => {
    const [snackState, setSnackState] = useState<ISnack>(DEFAULT_SNACK_STATE)
    const snack = useCallback(() => {
        return (
            <Snackbar
                anchorOrigin={snackState.anchorOrigin}
                open={snackState.open}
                autoHideDuration={snackState.autoHideDuration}
                onClose={() => {
                    setSnackState({ ...snackState, open: false })
                }}>
                <Alert severity={snackState.severity}>
                    {snackState.message}
                </Alert>
            </Snackbar>
        )
    }, [snackState])

    const notify = (message: string, severity: AlertColor) => {
        setSnackState({ ...snackState, open: true, message, severity })
    }

    return { snack, notify }
}
