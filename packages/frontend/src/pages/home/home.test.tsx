import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { act } from 'react-dom/test-utils'
import { Home } from '.'

const server = setupServer(
    rest.post('http://localhost/undefined/api/url', (req, res, ctx) => {
        return res(
            ctx.json({
                id: '02f68cc0-db56-4539-9ad9-78905a7fa470',
                url: 'https://www.google.com.br',
                key: 'wLzfZ'
            })
        )
    })
)

beforeEach(() => {
    server.listen()
})

afterEach(() => {
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})

describe('Home unit tests', () => {
    test('renders home', () => {
        render(<Home />)
        const linkElement = screen.getByTestId('insert-url')
        expect(linkElement).toBeInTheDocument()
    })
    jest.mock('.')
    test('should call copy to clipboard', async () => {
        render(<Home />)

        const insertInput = screen.getByRole('textbox')
        const insertButton = screen.getByTestId('insert-button')

        act(() => {
            userEvent.type(insertInput, 'https://google.com.br')
            fireEvent.click(insertButton)
        })

        const copyButton = await waitFor(async () =>
            screen.findByTestId('copy-button')
        )

        act(() => {
            fireEvent.click(copyButton)
        })

        expect(insertInput).toBeInTheDocument()
        expect(insertButton).toBeInTheDocument()
        expect(copyButton).toBeInTheDocument()
    })
})
