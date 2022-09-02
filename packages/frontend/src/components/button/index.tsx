import { Button as MButton } from '@mui/material'

interface IProps {
    label: string
    style?: React.CSSProperties
    onClick: () => void
}

export const Button = (props: IProps) => {
    const { onClick, label, style } = props
    return (
        <MButton
            color='primary'
            variant='contained'
            onClick={onClick}
            style={style}>
            {label}
        </MButton>
    )
}
