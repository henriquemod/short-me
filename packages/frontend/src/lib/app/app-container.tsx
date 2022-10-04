import { Container } from '@mui/material'
import AppContext, { IAppContext } from './app-context'
import { useNotification } from '../hooks/use-notification'

interface IProps {
    children: JSX.Element
}

export const AppContainer = ({ children }: IProps) => {
    const { notify, snack } = useNotification()

    const appSettings: IAppContext = {
        notify
    }

    return (
        <AppContext.Provider value={appSettings}>
            <Container style={{ display: 'flex', justifyContent: 'center' }}>
                {children}
                {snack}
            </Container>
        </AppContext.Provider>
    )
}
