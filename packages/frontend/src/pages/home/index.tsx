import { Fade, Grid } from '@mui/material'
import { InsertUrlInput } from '../../components/insert-url-input'
import { UrlList } from '../../components/url-list'
import UrlValidator from '../../lib/url-validator'
import { useUrl } from '../../lib/useUrl'
import Logo from '../../../public/assets/logo.svg'
import styled from 'styled-components'

const GRID_PROPS = {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    alignItems: 'center'
}

const LogoContainer = styled.img`
    max-width: calc(100vw - 80%);
    align-self: center;
`

export const Home = () => {
    const { create, urlList, loading } = useUrl()
    return (
        <Grid {...GRID_PROPS} display='flex' flexDirection='column'>
            <LogoContainer src={Logo} alt='' />
            <InsertUrlInput
                validateUrl={UrlValidator}
                handleCreateShortUrl={create}
                loading={loading}
            />
            <Fade in={urlList.length > 0}>
                <Grid container justifyContent='center'>
                    <UrlList itens={urlList} />
                </Grid>
            </Fade>
        </Grid>
    )
}
