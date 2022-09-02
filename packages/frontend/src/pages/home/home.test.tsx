import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../../App'

test('renders url input', () => {
    render(<App />)
    const linkElement = screen.getByTestId('insert-url')
    expect(linkElement).toBeInTheDocument()
})
