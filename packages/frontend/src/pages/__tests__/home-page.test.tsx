import { render, screen } from '@testing-library/react'
import { LandingPage } from '../landing-page'

describe('Home page unit test', () => {
    test('should render home page', () => {
        render(<LandingPage />)

        const container = screen.getByTestId('landingpage-grid')

        expect(container).toBeInTheDocument()
    })
})
