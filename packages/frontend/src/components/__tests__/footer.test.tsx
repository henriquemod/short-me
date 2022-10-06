import { render, screen } from '@testing-library/react'
import ReactDOM from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import Footer, { FooterGrid, SocialLink } from '../footer'

let container: HTMLDivElement

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    container.innerHTML = ''
})

describe('Footer Unit Teste', () => {
    it('should render footer', async () => {
        act(() => {
            ReactDOM.createRoot(container).render(<Footer isDark={false} />)
        })

        const logo = screen.getByText('Short me')
        const socialLinks = await screen.findAllByRole('social-link')

        expect(logo).toBeInTheDocument()
        expect(socialLinks).toHaveLength(2)
    })

    it('should render footer in dark mode', async () => {
        render(<Footer isDark />)

        const footer = screen.getByTestId('footer-container')
        const style = getComputedStyle(footer)

        expect(style.boxShadow).toBe('0 0 0 0')
    })
})

describe('Footer - SocialLink unit tests', () => {
    it('should render SocialLink with default color', () => {
        act(() => {
            ReactDOM.createRoot(container).render(
                <SocialLink data-testid='link-test'>
                    <a href='http://#' data-testid='link'>
                        Test
                    </a>
                </SocialLink>
            )
        })

        const element = screen.getByTestId('link-test')
        const link = screen.getByTestId('link')
        const style = getComputedStyle(link)

        expect(element).not.toHaveAttribute('color')
        expect(style.color).toBe('rgb(101, 37, 196)')
    })
})

describe('Footer - FooterGrid unit tests', () => {
    it('should render FooterGrid with shadow', () => {
        act(() => {
            ReactDOM.createRoot(container).render(
                <FooterGrid data-testid='test-shadow' shadow='0 0 0 0'>
                    <a href='http://#' data-testid='link'>
                        Test
                    </a>
                </FooterGrid>
            )
        })

        const element = screen.getByTestId('test-shadow')
        const style = getComputedStyle(element)

        expect(style.boxShadow).toBe('0 0 0 0')
    })

    it('should render FooterGrid without background color', () => {
        act(() => {
            ReactDOM.createRoot(container).render(
                <FooterGrid data-testid='test-color'>
                    <a href='http://#' data-testid='link'>
                        Test
                    </a>
                </FooterGrid>
            )
        })

        const element = screen.getByTestId('test-color')
        const style = getComputedStyle(element)

        expect(style.backgroundColor).toBe('rgb(101, 37, 196)')
    })
})
