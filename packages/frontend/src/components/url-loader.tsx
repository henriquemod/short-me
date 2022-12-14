import LaunchIcon from '@mui/icons-material/Launch'
import { Box, Button, Grid, Typography } from '@mui/material'
import CircularProgress, {
    CircularProgressProps
} from '@mui/material/CircularProgress'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useFindUrl } from '../lib/hooks/use-find-url'
import { useTimer } from '../lib/hooks/use-timer'
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

const CONTAINER_STYLE = {
    position: 'relative',
    display: 'inline-flex'
}

const TIMER_LABEL_STYLE = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number }
) => {
    const time = Number(
        [...props.value.toString()].length > 2
            ? 10
            : [...props.value.toString()][0]
    )

    return (
        <Box sx={CONTAINER_STYLE}>
            <CircularProgress variant='determinate' {...props} />
            <Box sx={TIMER_LABEL_STYLE}>
                <Typography
                    variant='caption'
                    component='div'
                    fontWeight={700}
                    fontSize='1.25em'
                    color='text.primary'>
                    {`${time}s`}
                </Typography>
            </Box>
        </Box>
    )
}

interface IProps {
    time?: number
}

export const UrlLoader = (props: IProps) => {
    const { key } = useParams()
    const { error, handleChangePage } = useFindUrl(key ?? '')
    const { timeLimit } = useTimer({
        time: props?.time
    })

    const renderLabel = useMemo(() => {
        if (timeLimit === 0) {
            return (
                <ButtonLabel>
                    Open link
                    <LaunchIcon />
                </ButtonLabel>
            )
        } else {
            return 'Just a second...'
        }
    }, [timeLimit])

    const renderContent = useMemo(() => {
        if (error) {
            return (
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
            )
        } else {
            return (
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
                            id='url-button'
                            fullWidth
                            role='action-button'
                            style={{ minHeight: '75px' }}
                            onClick={handleChangePage}
                            disabled={timeLimit !== 0}>
                            {renderLabel}
                        </Button>
                    </Grid>
                </>
            )
        }
    }, [error, handleChangePage, renderLabel, timeLimit])

    return (
        <Grid
            {...GRID_PROPS}
            container
            maxWidth={768}
            flexDirection='row'
            marginTop={5}>
            {renderContent}
        </Grid>
    )
}
