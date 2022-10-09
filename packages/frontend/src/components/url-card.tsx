import { ContentCopy, Delete } from '@mui/icons-material'
import { AlertColor, Button, Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ap, splitAt } from 'ramda'
import { useState } from 'react'
import styled from 'styled-components'
import { Colors } from '../lib/colors'
import { Messages } from '../lib/messages'

const CardContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const CardActions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    & button {
        margin-block: 5px;
    }
`

const ButtonLabel = styled.div`
    min-width: 100px;
    min-height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

export const CardContent = styled.div<{ color?: string }>`
    & h2 {
        color: ${props => (props.color ? props.color : Colors.primary)};
        margin-bottom: 20px;
    }

    & p {
        font-size: 0.75em;
        font-weight: 700;
    }

    & span {
        font-size: 1.5em;
        font-weight: 500;
        margin-left: 5px;
    }
`

interface IProps {
    shortUrl: string
    originalUrl: string
    id: string
    bottom: boolean
    handleDeleteUrl: (id: string) => Promise<void>
    copyToClipboard: (value: string) => void
    notify: (message: string, severity: AlertColor) => void
    setLock: (value: boolean) => void
}

export const UrlCard = ({
    shortUrl,
    originalUrl,
    handleDeleteUrl,
    copyToClipboard,
    notify,
    id,
    setLock,
    bottom
}: IProps) => {
    const theme = useTheme()
    const [loading, setLoading] = useState(false)
    const [head] = splitAt(20, originalUrl)
    const [, tail] = splitAt(originalUrl.length - 20, originalUrl)

    const newString = head + '...' + tail
    const finalUrl = originalUrl.length > 40 ? newString : originalUrl

    const PAPER_STYLE = {
        padding: '15px',
        marginBottom: bottom ? '100px' : '25px',
        backgroundColor: theme.palette.background.default
    }

    const handleCopyToClipboard = () => {
        try {
            copyToClipboard(shortUrl)
            notify(Messages.SuccessCopy, 'info')
        } catch (error) {
            notify(Messages.DefaultError, 'error')
        }
    }

    const handleLoad = (value: boolean) => ap([setLoading, setLock], [value])

    const handleClickDelete = async () => {
        try {
            handleLoad(true)
            await handleDeleteUrl(id)
            notify(Messages.SuccessDelete, 'success')
            handleLoad(false)
        } catch (error) {
            notify(Messages.DefaultError, 'error')
            handleLoad(false)
        }
    }

    const handleExtractDomain = (url: string) => {
        if (url.match('//')) {
            const [, suffix] = url.split('//')
            return suffix.split('/')[0]
        } else {
            return `https://${url.split('/')[0]}`
        }
    }

    return (
        <Paper elevation={2} style={PAPER_STYLE} className='url-card'>
            <CardContainer>
                <CardContent color={theme.palette.text.primary}>
                    <h2>{handleExtractDomain(originalUrl)}</h2>
                    <p>
                        Short URL:
                        <span>
                            <a
                                href={shortUrl}
                                target='_blank'
                                data-testid='short-url'
                                rel='noreferrer'>
                                {shortUrl}
                            </a>
                        </span>
                    </p>
                    <p>
                        Original URL:
                        <span data-testid='original-url'>{finalUrl}</span>
                    </p>
                </CardContent>
                <CardActions>
                    <Button
                        variant='contained'
                        onClick={handleCopyToClipboard}
                        data-testid='copy-button'
                        id='copy-button'
                        color='primary'>
                        <ButtonLabel>
                            Copy <ContentCopy fontSize='small' />
                        </ButtonLabel>
                    </Button>
                    <Button
                        variant='contained'
                        onClick={handleClickDelete}
                        data-testid='delete-button'
                        id='delete-button'
                        disabled={loading}
                        color='error'>
                        <ButtonLabel>
                            Delete <Delete fontSize='small' />
                        </ButtonLabel>
                    </Button>
                </CardActions>
            </CardContainer>
        </Paper>
    )
}
