import {
    Alert,
    AlertColor,
    AlertProps,
    Snackbar,
    SnackbarProps
} from '@mui/material'
import { useState } from 'react'

interface ISnack
    extends Pick<AlertProps, 'severity'>,
        Pick<
            SnackbarProps,
            'open' | 'message' | 'anchorOrigin' | 'autoHideDuration'
        > {
    shotUrl: string
}

const DEFAULT_SNACK_STATE: ISnack = {
    open: false,
    message: null,
    severity: 'error',
    autoHideDuration: 5000,
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    shotUrl: 'a'
}

export const useNotification = () => {
    const [snackState, setSnackState] = useState<ISnack>(DEFAULT_SNACK_STATE)
    const [snack, setSnack] = useState<JSX.Element>(
        <Snackbar
            anchorOrigin={snackState.anchorOrigin}
            open={snackState.open}
            autoHideDuration={snackState.autoHideDuration}
            onClose={() =>
                setSnackState({
                    ...snackState,
                    open: false
                })
            }>
            <Alert severity={snackState.severity}>{snackState.message}</Alert>
        </Snackbar>
    )

    const handleClose = () =>
        setSnackState({
            ...snackState,
            open: false
        })

    const notify = (message: string, severity: AlertColor) =>
        setSnack(
            <Snackbar
                open
                anchorOrigin={snackState.anchorOrigin}
                autoHideDuration={snackState.autoHideDuration}
                onClose={handleClose}>
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
        )

    return { snack, notify }
}
