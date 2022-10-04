import { render, screen } from '@testing-library/react'
import { LandingPage } from '../landing-page'

const handleChangeThemeSut = jest.fn()

describe('Home page unit test', () => {
    test('should render home page', () => {
        render(<LandingPage handleChangeTheme={handleChangeThemeSut} />)

        const container = screen.getByTestId('landingpage-grid')

        expect(container).toBeInTheDocument()
    })
})
