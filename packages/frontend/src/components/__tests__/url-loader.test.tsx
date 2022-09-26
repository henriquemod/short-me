import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { UrlLoader } from '../url-loader'

const server = setupServer(
    rest.get('http://localhost:8080/api/url/', (req, res, ctx) =>
        res(
            ctx.json({
                id: '02f68cc0-db56-4539-9ad9-78905a7fa470',
                url: 'www.google.com.br',
                key: 'wLzfZ'
            })
        )
    )
)

globalThis.IS_REACT_ACT_ENVIRONMENT = true
let container: HTMLDivElement
beforeEach(() => {
    server.listen()
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})

describe('Url list unit tests', () => {
    test('should render with url link disabled', async () => {
        render(<UrlLoader />)
        const finish = await waitFor(() => screen.getByText('Just a second...'))
        const button = screen.getByRole('action-button')
        expect(finish).toBeInTheDocument()
        expect(button).toBeDisabled()
    })

    test('should be able to click in url link', async () => {
        render(<UrlLoader time={0} />)
        const finish = await waitFor(() => screen.getByText('Open link'))
        const button = screen.getByRole('action-button')
        expect(finish).toBeInTheDocument()
        expect(button).not.toBeDisabled()
    })

    test('should show not found message with incorrect key param', async () => {
        server.close()

        const serverError = setupServer(
            rest.get('http://localhost:8080/api/url/', (req, res, ctx) =>
                res(ctx.status(404))
            )
        )

        serverError.listen()

        render(<UrlLoader time={0} />)

        await waitFor(() => {
            const message = screen.getByText(
                'The URL you tried either is wrong or no longer exists'
            )
            expect(message).toBeInTheDocument()
        })

        serverError.close()
    })
})
