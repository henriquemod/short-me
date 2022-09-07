import { Button, Grid, Paper } from '@mui/material'
import { splitAt } from 'ramda'
import styled from 'styled-components'

const CardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 10px;
`

const CardActions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    & button {
        margin-block: 5px;
    }
`

const CardContent = styled.div`
    & h2 {
        color: red;
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

    console.log({ originalUrl: originalUrl.length })

    return (
        <Grid item xs alignSelf='center'>
            <Paper elevation={3}>
                <CardContainer>
                    <CardContent>
                        <h2>Title</h2>
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
                        <Button variant='contained' color='primary'>
                            Copy
                        </Button>
                        <Button variant='contained' color='error'>
                            Delete
                        </Button>
                    </CardActions>
                </CardContainer>
            </Paper>
        </Grid>
    )
}
