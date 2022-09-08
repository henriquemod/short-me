import { Container, Grid } from '@mui/material'

interface IProps {
    children: JSX.Element
}

export const AppContainer = ({ children }: IProps) => (
    <Container>{children}</Container>
)
