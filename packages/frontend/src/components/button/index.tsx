import { Button as MButton } from '@mui/material'

interface IProps {
    label: string
    onClick: () => void
}

export const Button = (props: IProps) => {
    const { onClick, label } = props
    return (
        <MButton variant='contained' onClick={onClick}>
            {label}
        </MButton>
    )
}
