import { PhotoSizeSelectSmall } from '@mui/icons-material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import styled from 'styled-components'
import { Colors } from '../lib/colors'

const GITHUB_URL = 'https://github.com/henriquemod/short-me'
const LINKEDIN_URL = 'https://www.linkedin.com/in/henriqueasouza/'

export const FooterGrid = styled(Grid)<{ shadow?: string; color?: string }>`
    display: flex;
    background-color: ${props => (props.color ? props.color : Colors.primary)};
    position: fixed;
    bottom: 0;
    width: 720px;
    min-height: 64px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    box-shadow: 0px -1px 10px #363636;
    ${props => {
        if (props.shadow)
            return `
            box-shadow: ${props.shadow};
        `
    }}
`

const LogoGrid = styled(Grid)`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;

    & svg {
        margin-right: 10px;
    }
`

const ContentGrid = styled(Grid)`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const SocialLink = styled.div<{ color?: string }>`
    margin-inline: 10px;

    & a {
        text-decoration: none;
        color: ${props => (props.color ? props.color : Colors.primary)};
    }
`

interface IProps {
    isDark: boolean
}

const Footer = ({ isDark }: IProps) => {
    const theme = useTheme()
    const color = isDark ? theme.palette.background.default : Colors.primary
    const shadow = isDark ? '0 0 0 0' : '0px -1px 10px #363636'

    return (
        <FooterGrid
            item
            xs
            shadow={shadow}
            color={color}
            data-testid='footer-container'>
            <LogoGrid>
                <PhotoSizeSelectSmall
                    fontSize='small'
                    style={{ color: Colors.white }}
                />
                <Typography variant='body1' color={Colors.white}>
                    Short me
                </Typography>
            </LogoGrid>
            <ContentGrid>
                <SocialLink color={Colors.white}>
                    <a
                        href={LINKEDIN_URL}
                        target='_blank'
                        role='social-link'
                        rel='noreferrer'>
                        <LinkedInIcon fontSize='small' />
                    </a>
                </SocialLink>
                <SocialLink color={Colors.white}>
                    <a
                        href={GITHUB_URL}
                        target='_blank'
                        role='social-link'
                        rel='noreferrer'>
                        <GitHubIcon fontSize='small' />
                    </a>
                </SocialLink>
            </ContentGrid>
        </FooterGrid>
    )
}

export default Footer
