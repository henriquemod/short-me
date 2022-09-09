import React from 'react'
import { render, screen } from '@testing-library/react'
import { InsertUrlInput } from '../insert-url-input'
import ValidatePassword from '../../lib/url-validator'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom/client'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

const handleCreateShortUrl = async (url: string) => {
    Promise.resolve('test')
}

let container: HTMLDivElement

const INVALID_URL = '1'
const VALID_URL = 'https://validurl.com'

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

test('should return default error message on invalid url', async () => {
    render(
        <InsertUrlInput
            validateUrl={ValidatePassword}
            handleCreateShortUrl={handleCreateShortUrl}
            loading={false}
        />
    )
    const linkElement = screen.getByTestId('insert-url')
    const buttonElement = screen.getByTestId('insert-button')

    userEvent.type(linkElement, INVALID_URL)
    userEvent.click(buttonElement)
    const message = screen.getByText(
        'An error ocurred, please try again later.'
    )
    expect(linkElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
    expect(message).toBeInTheDocument()
})

test('should return default error message on empty url', async () => {
    render(
        <InsertUrlInput
            validateUrl={ValidatePassword}
            handleCreateShortUrl={handleCreateShortUrl}
            loading={false}
        />
    )

    const buttonElement = screen.getByTestId('insert-button')
    userEvent.click(buttonElement)

    const message = screen.getByText(
        'An error ocurred, please try again later.'
    )

    expect(buttonElement).toBeInTheDocument()
    expect(message).toBeInTheDocument()
})

test('should return success message on valid url', async () => {
    act(() => {
        ReactDOM.createRoot(container).render(
            <InsertUrlInput
                validateUrl={ValidatePassword}
                handleCreateShortUrl={handleCreateShortUrl}
                loading={false}
            />
        )
    })

    const input = container.querySelector('#insert-url-2')
    const button = container.querySelector('#insert-button')

    if (input && button) {
        await act(async () => {
            userEvent.type(input, VALID_URL)
            userEvent.click(button)
        })
    }

    const message = screen.getByText('Your url was successfully shortened.')

    expect(message).toBeInTheDocument()
})
