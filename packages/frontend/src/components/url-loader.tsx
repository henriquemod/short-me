import { Box, Button, Grid, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import CircularProgress, {
    CircularProgressProps
} from '@mui/material/CircularProgress'
import { useFindUrl } from '../lib/hooks/useFindUrl'
import { useParams } from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch'
import styled from 'styled-components'
import { Messages } from '../lib/messages'

const GRID_PROPS = {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
}

const ButtonLabel = styled.div`
    min-width: 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number }
) => (
    <Box
        sx={{
            position: 'relative',
            display: 'inline-flex'
        }}>
        <CircularProgress variant='determinate' {...props} />
        <Box
            sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Typography
                variant='caption'
                component='div'
                fontWeight={700}
                fontSize='1.25em'
                color='text.primary'>{`${Math.round(
                Number(
                    [...props.value.toString()].length > 2
                        ? 10
                        : [...props.value.toString()][0]
                )
            )}s`}</Typography>
        </Box>
    </Box>
)

export const UrlLoader = () => {
    const { key } = useParams()
    const [enabled, setEnabled] = useState(false)
    const [timeLimit, setTimeLimit] = useState(100)
    const { url, error } = useFindUrl(key ?? '')

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLimit(prev => (prev === 0 ? 0 : prev - 10))
        }, 1000)

        if (timeLimit === 0) {
            setEnabled(true)
        }
        return () => {
            clearInterval(timer)
        }
    }, [timeLimit])

    const handleClickButton = useCallback(() => {
        if (url) window.location.assign(url)
    }, [url])

    const renderLabel = useMemo(() => {
        if (enabled) {
            return (
                <ButtonLabel>
                    Open link <LaunchIcon />
                </ButtonLabel>
            )
        } else {
            return 'Just a second...'
        }
    }, [enabled])

    return (
        <Grid
            {...GRID_PROPS}
            container
            maxWidth={768}
            flexDirection='row'
            marginTop={5}>
            {error ? (
                <Grid
                    item
                    xs
                    display='flex'
                    justifyContent='center'
                    textAlign='center'>
                    <Typography variant='h5'>
                        {Messages.UrlNotAvailable}
                    </Typography>
                </Grid>
            ) : (
                <>
                    <Grid item xs={2} display='flex' justifyContent='center'>
                        <CircularProgressWithLabel
                            value={timeLimit}
                            size={75}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            size='large'
                            variant='contained'
                            fullWidth
                            style={{ minHeight: '75px' }}
                            onClick={handleClickButton}
                            disabled={!enabled}>
                            {renderLabel}
                        </Button>
                    </Grid>
                </>
            )}
        </Grid>
    )
}
