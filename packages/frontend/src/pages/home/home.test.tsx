import { render, screen } from '@testing-library/react'
import { Home } from '.'

describe('Home unit tests', () => {
    test('renders home', () => {
        render(<Home />)
        const linkElement = screen.getByTestId('insert-url')
        expect(linkElement).toBeInTheDocument()
    })
})
