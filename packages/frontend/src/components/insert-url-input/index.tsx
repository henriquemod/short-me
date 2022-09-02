import { TextField } from '@mui/material'
import { CSSProperties, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`

interface IProps {
    button: React.ElementType
}

const INPUT_STYLE: CSSProperties = {
    minWidth: '500px',
    marginRight: '15px'
}

export const InsertUrlInput = (props: IProps) => {
    const { button: InsertButton } = props
    const [value, setValue] = useState<string>()

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <Container>
            <TextField
                id='insert-url'
                data-testid='insert-url'
                label='URL'
                variant='outlined'
                value={value}
                onChange={handleChangeValue}
                style={INPUT_STYLE}
            />
            <InsertButton />
        </Container>
    )
}
