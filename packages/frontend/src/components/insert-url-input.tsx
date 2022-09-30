import { PhotoSizeSelectSmall } from '@mui/icons-material'
import {
    AlertColor,
    Button,
    CircularProgress,
    Container,
    Grid,
    TextField
} from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { IUrl } from '../lib/hooks/useUrl'
import { Messages } from '../lib/messages'

const ButtonLabel = styled.div`
    width: 100%;
    min-height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const BUTTON_STYLE = { height: '100%', minWidth: '107px' }
const CIRCULAR_PROGRESS_SIZE = 25

interface IProps {
    validateUrl: (url: string) => boolean
    handleCreateShortUrl: (url: string) => Promise<IUrl | void>
    loading: boolean
    lock: boolean
    notify: (message: string, severity: AlertColor) => void
}

export const InsertUrlInput = ({
    validateUrl,
    handleCreateShortUrl,
    notify,
    loading,
    lock
}: IProps) => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const isValidUrl = validateUrl(value)
        setError(!isValidUrl)
        setValue(value)
    }

    const handleClickButton = async () => {
        if (!error) {
            if (value.length === 0) {
                inputRef.current?.focus()
                notify(Messages.UrlNotProvided, 'info')
            } else {
                const shortUrl = await handleCreateShortUrl(value)
                if (shortUrl) {
                    notify(Messages.Success, 'success')
                    setValue('')
                } else {
                    notify(Messages.NetworkRequestError, 'error')
                }
            }
        } else {
            notify(Messages.DefaultError, 'error')
        }
    }

    const buttonLabel = useMemo(
        () =>
            loading && !lock ? (
                <CircularProgress
                    size={CIRCULAR_PROGRESS_SIZE}
                    id='circular-progress'
                />
            ) : (
                <ButtonLabel>
                    Short me <PhotoSizeSelectSmall fontSize='small' />
                </ButtonLabel>
            ),
        [loading]
    )

    return (
        <Container>
            <Grid display='flex' container spacing={2}>
                <Grid xs item>
                    <TextField
                        id='insert-url'
                        fullWidth
                        data-testid='insert-url'
                        label='URL'
                        variant='outlined'
                        disabled={loading || lock}
                        value={value}
                        onChange={handleChangeValue}
                        error={error}
                        inputRef={inputRef}
                        inputProps={{
                            id: 'insert-url-2',
                            role: 'textbox'
                        }}
                    />
                </Grid>
                <Grid xs={3} item>
                    <Button
                        fullWidth
                        color='primary'
                        variant='contained'
                        id='insert-button'
                        style={BUTTON_STYLE}
                        disabled={loading}
                        data-testid='insert-button'
                        onClick={handleClickButton}>
                        {buttonLabel}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
