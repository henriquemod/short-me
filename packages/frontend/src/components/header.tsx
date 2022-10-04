import { PhotoSizeSelectSmall } from '@mui/icons-material'
import { Box, Switch } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const label = { inputProps: { 'aria-label': 'Switch demo' } }

interface IProps {
    handleChangeTheme: () => void
}

const Header = ({ handleChangeTheme }: IProps) => {
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark'
    return (
        <AppBar position='static' style={{ width: '100vw' }}>
            <Toolbar>
                <Box marginRight={1} justifyContent='center'>
                    <PhotoSizeSelectSmall fontSize='small' />
                </Box>
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
                <Switch
                    {...label}
                    checked={isDark}
                    onChange={() => {
                        handleChangeTheme()
                    }}
                />
            </Toolbar>
        </AppBar>
    )
}

export default Header
