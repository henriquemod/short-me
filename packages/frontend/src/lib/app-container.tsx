import { Grid } from '@mui/material'

interface IProps {
    children: JSX.Element
}

export const AppContainer = ({ children }: IProps) => (
    <Grid
        display='flex'
        flexDirection='column'
        justifyContent='center'
        height={'100vh'}>
        {children}
    </Grid>
)
