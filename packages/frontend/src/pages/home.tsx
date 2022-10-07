import { AlertColor, Fade, Grid } from '@mui/material'
import { Container } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Footer from '../components/footer'
import Header from '../components/header'
import { InsertUrlInput } from '../components/insert-url-input'
import { UrlList } from '../components/url-list'
import AppContext from '../lib/app/app-context'
import { useUrl } from '../lib/hooks/use-url'
import LogoSVG from '../lib/svgs/logo'
import UrlValidator from '../lib/url-validator'
import { useTheme } from '@mui/material/styles'

const GRID_PROPS = {
    marginBottom: 2,
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex'
}

const LogoContainer = styled.div`
    width: 350px;
    align-self: center;
`

const copyToClipboard = (value: string) => navigator.clipboard.writeText(value)

interface IProps {
    handleChangeTheme: () => void
}

export const Home = ({ handleChangeTheme }: IProps) => {
    const theme = useTheme()
    const { create, remove, urlList, loading } = useUrl()
    const [open, setOpen] = useState(false)
    const [lock, setLock] = useState(false)
    const { notify } = useContext(AppContext)
    const isDark = theme.palette.mode === 'dark'

    useEffect(() => {
        setOpen(urlList.length > 0)
    }, [urlList.length])

    const dispatchNotification = (message: string, severity: AlertColor) => {
        notify?.(message, severity)
    }

    return (
        <Grid {...GRID_PROPS} container maxWidth={768} flexDirection='column'>
            <Header handleChangeTheme={handleChangeTheme} />
            <LogoContainer>
                <LogoSVG />
            </LogoContainer>
            <InsertUrlInput
                validateUrl={UrlValidator}
                handleCreateShortUrl={create}
                notify={dispatchNotification}
                loading={loading}
                lock={lock}
            />
            <Fade in={open}>
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
                            setLock={setLock}
                        />
                    </Grid>
                </Container>
            </Fade>
            <Footer isDark={isDark} />
        </Grid>
    )
}
