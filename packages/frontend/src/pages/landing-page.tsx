import { Grid } from '@mui/material'
import styled from 'styled-components'
import Logo from '../../public/assets/logo.svg'
import { UrlLoader } from '../components/url-loader'

const LogoContainer = styled.img`
    max-width: 20vw;
    align-self: center;
`

const GRID_PROPS = {
    marginBottom: 2,
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex'
}

export const LandingPage = () => {
    return (
        <Grid
            {...GRID_PROPS}
            container
            maxWidth={768}
            flexDirection='column'
            data-testid='landingpage-grid'>
            <LogoContainer src={Logo} alt='ShortMe Logo' />
            <UrlLoader />
        </Grid>
    )
}
