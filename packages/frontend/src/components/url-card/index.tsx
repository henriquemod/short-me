import { ContentCopy, Delete } from '@mui/icons-material'
import { Button, Paper } from '@mui/material'
import { splitAt } from 'ramda'
import styled from 'styled-components'
import { Colors } from '../../lib/colors'

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
}

export const UrlCard = ({ shortUrl, originalUrl }: IProps) => {
    const [head] = splitAt(20, originalUrl)
    const [, tail] = splitAt(originalUrl.length - 20, originalUrl)

    const newString = head + '...' + tail
    const finalUrl = originalUrl.length > 40 ? newString : originalUrl

    const handleCopyToClipboard = () => navigator.clipboard.writeText(shortUrl)

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
                                href='http://#'
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
                    <Button variant='contained' color='error'>
                        <ButtonLabel>
                            Delete <Delete fontSize='small' />
                        </ButtonLabel>
                    </Button>
                </CardActions>
            </CardContainer>
        </Paper>
    )
}
