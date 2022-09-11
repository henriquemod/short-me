import { PhotoSizeSelectSmall } from '@mui/icons-material'
import {
    AlertColor,
    Button,
    ButtonTypeMap,
    CircularProgress,
    Container,
    Grid,
    TextField
} from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Messages } from '../lib/messages'

const ButtonLabel = styled.div`
    width: 100%;
    min-height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const ButtonProps: ButtonTypeMap['props'] = {
    color: 'primary',
    variant: 'contained'
}

interface IProps {
    validateUrl: (url: string) => boolean
    handleCreateShortUrl: (url: string) => Promise<void>
    loading: boolean
    notify?: (message: string, severity: AlertColor) => void
}

export const InsertUrlInput = ({
    validateUrl,
    handleCreateShortUrl,
    notify,
    loading
}: IProps) => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState(false)

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        const isValidUrl = validateUrl(value)
        setError(!isValidUrl)
        setValue(value)
    }

    const handleClickButton = async () => {
        if (!error && value) {
            await handleCreateShortUrl(value)
            if (notify) notify(Messages.Success, 'success')
            setValue('')
        } else {
            if (notify) notify(Messages.DefaultError, 'error')
        }
    }

    const renderChild = loading ? (
        <CircularProgress size={25} id='circular-progress' />
    ) : (
        <ButtonLabel>
            Short me <PhotoSizeSelectSmall fontSize='small' />
        </ButtonLabel>
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
                        disabled={loading}
                        value={value}
                        onChange={handleChangeValue}
                        error={error}
                        inputProps={{
                            id: 'insert-url-2',
                            role: 'textbox'
                        }}
                    />
                </Grid>
                <Grid xs={3} item>
                    <Button
                        {...ButtonProps}
                        fullWidth
                        id='insert-button'
                        style={{ height: '100%', minWidth: '107px' }}
                        disabled={loading}
                        data-testid='insert-button'
                        onClick={handleClickButton}>
                        {renderChild}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
