import { Button, ButtonTypeMap, TextField } from '@mui/material'
import { CSSProperties, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Messages } from '../../lib/messages'
import { useNotification } from '../../lib/useNotification'

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`

const INPUT_STYLE: CSSProperties = {
    minWidth: '500px',
    marginRight: '15px'
}

const ButtonProps: ButtonTypeMap['props'] = {
    color: 'primary',
    variant: 'contained'
}

interface IProps {
    validateUrl: (url: string) => boolean
    handleCreateShortUrl: (url: string) => Promise<string>
}

export const InsertUrlInput = ({
    validateUrl,
    handleCreateShortUrl
}: IProps) => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState(false)
    const { notify, snack } = useNotification()

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        const isValidUrl = validateUrl(value)
        setError(!isValidUrl)
        setValue(value)
    }

    const handleClickButton = async () => {
        if (!error && value) {
            const shortUrl = await handleCreateShortUrl(value)
            notify(Messages.Success + ` Link: ${shortUrl}`, 'success')
        } else {
            notify(Messages.DefaultError, 'error')
        }
    }

    const modalWrapper = useCallback(() => {
        return snack
    }, [snack])

    return (
        <>
            <Container>
                <TextField
                    id='insert-url'
                    data-testid='insert-url'
                    label='URL'
                    variant='outlined'
                    value={value}
                    onChange={handleChangeValue}
                    error={error}
                    style={INPUT_STYLE}
                    inputProps={{ id: 'insert-url-2', role: 'textbox' }}
                />
                <Button
                    {...ButtonProps}
                    id='insert-button'
                    data-testid='insert-button'
                    onClick={handleClickButton}>
                    Short me!
                </Button>
            </Container>
            {modalWrapper()}
        </>
    )
}
