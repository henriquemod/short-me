import { Grid } from '@mui/material'
import styled from 'styled-components'
import { UrlLoader } from '../components/url-loader'
import LogoSVG from '../lib/svgs/logo'

const LogoContainer = styled.div`
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
            <LogoContainer>
                <LogoSVG />
            </LogoContainer>
            <UrlLoader />
        </Grid>
    )
}
