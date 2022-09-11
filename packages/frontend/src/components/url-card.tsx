import { ContentCopy, Delete } from '@mui/icons-material'
import { AlertColor, Button, Paper } from '@mui/material'
import { splitAt } from 'ramda'
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

const CardContent = styled.div`
    & h2 {
        color: ${Colors.primary};
        margin-bottom: 20px;
    }

    & p {
        font-size: 0.7em;
        font-weight: 700;
    }

    & span {
        font-size: 1.2em;
        font-weight: 500;
        margin-left: 5px;
    }
`

interface IProps {
    shortUrl: string
    originalUrl: string
    id: string
    handleDeleteUrl: (id: string) => Promise<void>
    copyToClipboard: (value: string) => void
    notify?: (message: string, severity: AlertColor) => void
}

export const UrlCard = ({
    shortUrl,
    originalUrl,
    handleDeleteUrl,
    copyToClipboard,
    notify,
    id
}: IProps) => {
    const [head] = splitAt(20, originalUrl)
    const [, tail] = splitAt(originalUrl.length - 20, originalUrl)

    const newString = head + '...' + tail
    const finalUrl = originalUrl.length > 40 ? newString : originalUrl

    const handleCopyToClipboard = () => {
        try {
            copyToClipboard(shortUrl)
            if (notify) notify(Messages.SuccessCopy, 'info')
        } catch (error) {
            if (notify) notify(Messages.DefaultError, 'error')
        }
    }

    const handleClickDelete = async () => {
        try {
            await handleDeleteUrl(id)
            if (notify) notify(Messages.SuccessDelete, 'success')
        } catch (error) {
            if (notify) notify(Messages.DefaultError, 'error')
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
        <Paper
            elevation={5}
            style={{ padding: '15px', marginBottom: '25px' }}
            className='url-card'>
            <CardContainer>
                <CardContent>
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
