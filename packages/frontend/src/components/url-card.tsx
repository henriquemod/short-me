import { ContentCopy, Delete } from '@mui/icons-material'
import { Button, Paper } from '@mui/material'
import { splitAt } from 'ramda'
import { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../lib/app/app-context'
import { Colors } from '../lib/colors'
import { Messages } from '../lib/messages'

const domain_from_url = (url: string) => {
    var result
    var match
    if (
        (match = url.match(
            /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
        ))
    ) {
        result = match[1]
        if ((match = result.match(/^[^\.]+\.(.+\..+)$/))) {
            result = match[1]
        }
    }
    return result
}

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
    }
`

interface IProps {
    shortUrl: string
    originalUrl: string
    id: string
    handleDeleteUrl: (id: string) => Promise<void>
}

export const UrlCard = ({
    shortUrl,
    originalUrl,
    handleDeleteUrl,
    id
}: IProps) => {
    const { notify } = useContext(AppContext)
    const [head] = splitAt(20, originalUrl)
    const [, tail] = splitAt(originalUrl.length - 20, originalUrl)

    const newString = head + '...' + tail
    const finalUrl = originalUrl.length > 40 ? newString : originalUrl

    const handleCopyToClipboard = () => {
        try {
            navigator.clipboard.writeText(shortUrl)
            if (notify) notify(Messages.SuccessShorten, 'info')
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

    return (
        <Paper elevation={5} style={{ padding: '15px', marginBottom: '25px' }}>
            <CardContainer>
                <CardContent>
                    <h2>{domain_from_url(originalUrl)}</h2>
                    <p>
                        Short URL:
                        <span>
                            {' '}
                            <a
                                href={shortUrl}
                                target='_blank'
                                rel='noopener noreferrer'>
                                {' '}
                                {shortUrl}
                            </a>
                        </span>
                    </p>
                    <p>
                        Original URL:
                        <span> {finalUrl}</span>
                    </p>
                </CardContent>
                <CardActions>
                    <Button
                        variant='contained'
                        onClick={handleCopyToClipboard}
                        color='primary'>
                        <ButtonLabel>
                            Copy <ContentCopy fontSize='small' />
                        </ButtonLabel>
                    </Button>
                    <Button
                        variant='contained'
                        onClick={handleClickDelete}
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
