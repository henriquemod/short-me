import {
    Button,
    ButtonTypeMap,
    CircularProgress,
    Container,
    Grid,
    TextField
} from '@mui/material'
import { CSSProperties, useState } from 'react'
import { Messages } from '../../lib/messages'
import { useNotification } from '../../lib/useNotification'

const INPUT_STYLE: CSSProperties = {}

const ButtonProps: ButtonTypeMap['props'] = {
    color: 'primary',
    variant: 'contained'
}

interface IProps {
    validateUrl: (url: string) => boolean
    handleCreateShortUrl: (url: string) => Promise<void>
    loading: boolean
}

export const InsertUrlInput = ({
    validateUrl,
    handleCreateShortUrl,
    loading
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
            await handleCreateShortUrl(value)
            notify(Messages.Success, 'success')
            setValue('')
        } else {
            notify(Messages.DefaultError, 'error')
        }
    }

    const renderChild = loading ? <CircularProgress size={25} /> : 'Short me'

    return (
        <Container>
            <Grid display='flex' container spacing={2} paddingX={25}>
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
                        style={INPUT_STYLE}
                        inputProps={{ id: 'insert-url-2', role: 'textbox' }}
                    />
                </Grid>
                <Grid xs={2} item>
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
                {snack()}
            </Grid>
        </Container>
    )
}
