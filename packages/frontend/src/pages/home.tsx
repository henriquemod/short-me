import { AlertColor, Fade, Grid } from '@mui/material'
import { Container } from '@mui/system'
import { useContext } from 'react'
import styled from 'styled-components'

import { InsertUrlInput } from '../components/insert-url-input'
import { UrlList } from '../components/url-list'
import AppContext from '../lib/app/app-context'
import { useUrl } from '../lib/hooks/useUrl'
import LogoSVG from '../lib/svgs/logo'
import UrlValidator from '../lib/url-validator'

const GRID_PROPS = {
    marginBottom: 2,
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex'
}

const LogoContainer = styled.div`
    max-width: 20vw;
    align-self: center;
`

const copyToClipboard = (value: string) => navigator.clipboard.writeText(value)

export const Home = () => {
    const { create, remove, urlList, loading } = useUrl()
    const { notify } = useContext(AppContext)

    const dispatchNotification = (message: string, severity: AlertColor) => {
        notify?.(message, severity)
    }

    return (
        <Grid {...GRID_PROPS} container maxWidth={768} flexDirection='column'>
            <LogoContainer>
                <LogoSVG />
            </LogoContainer>
            <InsertUrlInput
                validateUrl={UrlValidator}
                handleCreateShortUrl={create}
                notify={dispatchNotification}
                loading={loading}
            />
            <Fade in={urlList.length > 0}>
                <Container>
                    <Grid
                        container
                        marginY={4}
                        display='flex'
                        justifyContent='center'>
                        <UrlList
                            handleDeleteUrl={remove}
                            itens={urlList}
                            notify={dispatchNotification}
                            copyToClipboard={copyToClipboard}
                        />
                    </Grid>
                </Container>
            </Fade>
        </Grid>
    )
}
