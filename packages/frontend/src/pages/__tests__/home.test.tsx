import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { act } from 'react-dom/test-utils'
import { IUrlList } from '../../lib/hooks/use-url'
import { Home } from '../home'

const server = setupServer(
    rest.get<IUrlList>('http://localhost:8080/api/url', (_, res, ctx) => {
        return res(
            ctx.json({
                urls: []
            })
        )
    }),
    rest.post('http://localhost:8080/api/url', (req, res, ctx) => {
        return res(
            ctx.json({
                id: '02f68cc0-db56-4539-9ad9-78905a7fa470',
                url: 'https://www.google.com.br',
                key: 'wLzfZ'
            })
        )
    })
)

const handleChangeThemeSut = jest.fn()

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
        render(<Home handleChangeTheme={handleChangeThemeSut} />)
        const linkElement = screen.getByTestId('insert-url')
        expect(linkElement).toBeInTheDocument()
    })
    jest.mock('../home.tsx')
    test('should call copy to clipboard', async () => {
        render(<Home handleChangeTheme={handleChangeThemeSut} />)

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
