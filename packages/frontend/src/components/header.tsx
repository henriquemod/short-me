import { PhotoSizeSelectSmall } from '@mui/icons-material'
import { Box, Switch } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow'
import styled from 'styled-components'

const label = { inputProps: { 'aria-label': 'Switch demo' } }

interface IProps {
    handleChangeTheme: () => void
}

const CenteredBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Header = ({ handleChangeTheme }: IProps) => {
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark'
    return (
        <AppBar position='static' style={{ width: '100vw' }}>
            <Toolbar>
                <CenteredBox marginRight={1}>
                    <PhotoSizeSelectSmall fontSize='small' />
                </CenteredBox>
                <Box
                    justifyContent='center'
                    sx={{ flexGrow: 1 }}
                    marginTop={0.3}>
                    <Typography
                        variant='h5'
                        component='div'
                        sx={{ flexGrow: 1 }}>
                        Short me
                    </Typography>
                </Box>
                <CenteredBox marginRight={1}>
                    <BrightnessLowIcon fontSize='medium' />
                </CenteredBox>
                <Switch
                    {...label}
                    checked={isDark}
                    role='theme-switch'
                    onChange={handleChangeTheme}
                />
            </Toolbar>
        </AppBar>
    )
}

export default Header
