import { Grid } from '@mui/material'
import styled from 'styled-components'
import { Colors } from '../lib/colors'

const FooterGrid = styled(Grid)`
    position: fixed;
    bottom: 0;
    background-color: ${Colors.primary};
    height: 10vh;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
`

const Footer = () => {
    return (
        <FooterGrid sx={{ flexGrow: 1 }} item xs>
            <h2>Footer</h2>
        </FooterGrid>
    )
}

export default Footer
