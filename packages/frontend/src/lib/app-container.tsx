import { Container } from '@mui/material'

interface IProps {
    children: JSX.Element
}

export const AppContainer = ({ children }: IProps) => (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
        {children}
    </Container>
)
