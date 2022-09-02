import React from 'react'
import { render, screen } from '@testing-library/react'
import { Home } from '.'

test('renders url input', () => {
    render(<Home />)
    const linkElement = screen.getByTestId('insert-url')
    expect(linkElement).toBeInTheDocument()
})
