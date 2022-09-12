import { Grid } from '@mui/material'
import styled from 'styled-components'
import Logo from '../../../public/assets/logo.svg'
import { UrlLoader } from '../../components/url-loader'

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
    const handleChangePage = (url: string) => window.location.assign(url)

    return (
        <Grid {...GRID_PROPS} container maxWidth={768} flexDirection='column'>
            <LogoContainer src={Logo} alt='ShortMe Logo' />
            <UrlLoader handleChangePage={handleChangePage} />
        </Grid>
    )
}
