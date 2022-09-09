import { Fade, Grid } from '@mui/material'
import { InsertUrlInput } from '../../components/insert-url-input'
import { UrlList } from '../../components/url-list'
import UrlValidator from '../../lib/url-validator'
import { useUrl } from '../../lib/hooks/useUrl'
import Logo from '../../../public/assets/logo.svg'
import styled from 'styled-components'
import { Container } from '@mui/system'

const GRID_PROPS = {
    marginBottom: 2,
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex'
}

const LogoContainer = styled.img`
    max-width: 20vw;
    align-self: center;
`

export const Home = () => {
    const { create, remove, urlList, loading } = useUrl()
    return (
        <Grid {...GRID_PROPS} container maxWidth={768} flexDirection='column'>
            <LogoContainer src={Logo} alt='ShortMe Logo' />
            <InsertUrlInput
                validateUrl={UrlValidator}
                handleCreateShortUrl={create}
                loading={loading}
            />
            <Fade in={urlList.length > 0}>
                <Container>
                    <Grid
                        container
                        marginY={4}
                        display='flex'
                        justifyContent='center'>
                        <UrlList handleDeleteUrl={remove} itens={urlList} />
                    </Grid>
                </Container>
            </Fade>
        </Grid>
    )
}
