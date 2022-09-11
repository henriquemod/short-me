import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UrlCard } from '../url-card'

globalThis.IS_REACT_ACT_ENVIRONMENT = true
let container: HTMLDivElement

const VALID_URL_US = 'https://validurl.com'
const VALID_URL_US_2 = 'validurl.com'
const VALID_URL_BR = 'https://validurl.com.br'
const VALID_URL_BR_2 = 'validurl.com.br'
const VALID_URL_UK = 'https://validurl.com.uk'
const VALID_URL_UK_2 = 'validurl.com.uk'
const VALID_HTTP = 'http://validurl.com.br'
const VALID_URL_WITH_PARAMS =
    'https://validurl.com.br/remix-run/react-router/blob/main/docs/getting-started/faq.md'
const HUGE_URL =
    'https://validurl.com.br/remix-run/react-router/blob/main/docs/getting-started/remix-run/react-router/blob/main/docs/getting-started/remix-run/react-router/blob/main/docs/frontend?path=/webpack/webpack.base.js'

const handleDeleteUrlStub = (_: string) => Promise.resolve()
const copyToClipboardStub = (value: string) =>
    navigator.clipboard.writeText(value)

const mockValidCard = {
    id: 'valid_id',
    shortUrl: 'valid_short_url',
    handleDeleteUrl: handleDeleteUrlStub,
    copyToClipboard: copyToClipboardStub
}

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

describe('URL Card unit tests - Different domains', () => {
    test('Should show card title with protocol http', () => {
        render(<UrlCard {...mockValidCard} originalUrl={VALID_HTTP} />)

        const title = screen.getByText('validurl.com.br')

        expect(title).toBeInTheDocument()
    })

    test('Should show card title with params', () => {
        render(
            <UrlCard {...mockValidCard} originalUrl={VALID_URL_WITH_PARAMS} />
        )

        const title = screen.getByText('validurl.com.br')

        expect(title).toBeInTheDocument()
    })
    test('Should show card title .com with protocol', () => {
        render(<UrlCard {...mockValidCard} originalUrl={VALID_URL_US} />)

        const title = screen.getByText('validurl.com')

        expect(title).toBeInTheDocument()
    })

    test('Should show card title .com without protocol', () => {
        render(<UrlCard {...mockValidCard} originalUrl={VALID_URL_US_2} />)

        const title = screen.getByText('validurl.com')

        expect(title).toBeInTheDocument()
    })

    test('Should show card title .com.br with protocol', () => {
        render(<UrlCard {...mockValidCard} originalUrl={VALID_URL_BR} />)

        const title = screen.getByText('validurl.com.br')

        expect(title).toBeInTheDocument()
    })

    test('Should show card title .com.br without protocol', () => {
        render(<UrlCard {...mockValidCard} originalUrl={VALID_URL_BR_2} />)

        const title = screen.getByText('validurl.com.br')

        expect(title).toBeInTheDocument()
    })

    test('Should show card title .com.uk with protocol', () => {
        render(<UrlCard {...mockValidCard} originalUrl={VALID_URL_UK} />)

        const title = screen.getByText('validurl.com.uk')

        expect(title).toBeInTheDocument()
    })

    test('Should show card title .com.uk without protocol', () => {
        render(<UrlCard {...mockValidCard} originalUrl={VALID_URL_UK_2} />)

        const title = screen.getByText('validurl.com.uk')

        expect(title).toBeInTheDocument()
    })
})

describe('URL Card unit tests - Body content', () => {
    test('should show correct short url', () => {
        render(<UrlCard {...mockValidCard} originalUrl={VALID_URL_US} />)

        const label = screen.getByText('Short URL:')
        const shortUrl = screen.getByTestId('short-url')

        expect(label).toBeInTheDocument()
        expect(shortUrl).toBeInTheDocument()
        expect(shortUrl).toContainHTML('valid_short_url')
    })

    test('should show correct original url', () => {
        render(<UrlCard {...mockValidCard} originalUrl={VALID_URL_US} />)

        const label = screen.getByText('Original URL:')
        const originalUrl = screen.getByTestId('original-url')

        expect(label).toBeInTheDocument()
        expect(originalUrl).toBeInTheDocument()
        expect(originalUrl).toContainHTML('https://validurl.com')
    })

    test('should show smaller original url case original url is too long', () => {
        render(
            <UrlCard {...mockValidCard} originalUrl={VALID_URL_WITH_PARAMS} />
        )

        const label = screen.getByText('Original URL:')
        const originalUrl = screen.getByTestId('original-url')

        expect(label).toBeInTheDocument()
        expect(originalUrl).toBeInTheDocument()
        expect(originalUrl).toHaveTextContent('https://validurl')
        expect(originalUrl).toHaveTextContent('...')
        expect(originalUrl).toHaveTextContent('/faq.md')
        expect(originalUrl.innerHTML).toHaveLength(43)
    })

    test('should show smaller original url case original url is huge', () => {
        render(<UrlCard {...mockValidCard} originalUrl={HUGE_URL} />)

        const label = screen.getByText('Original URL:')
        const originalUrl = screen.getByTestId('original-url')

        expect(label).toBeInTheDocument()
        expect(originalUrl).toBeInTheDocument()
        expect(originalUrl).toHaveTextContent('https://validurl')
        expect(originalUrl).toHaveTextContent('...')
        expect(originalUrl).toHaveTextContent('base.js')
        expect(originalUrl.innerHTML).toHaveLength(43)
    })
})

describe('URL Card unit tests - Buttons', () => {
    test('should display copy button', () => {
        render(<UrlCard {...mockValidCard} originalUrl={VALID_URL_US} />)

        const button = screen.getByTestId('copy-button')

        expect(button).toBeInTheDocument()
    })

    test('should call copy to clipboard with correct values', () => {
        const spyCopy = jest.spyOn(mockValidCard, 'copyToClipboard')

        render(<UrlCard {...mockValidCard} originalUrl={VALID_URL_US} />)

        const button = screen.getByTestId('copy-button')
        userEvent.click(button)

        expect(spyCopy).toBeCalledWith(mockValidCard.shortUrl)
    })

    test('should display delete button', () => {
        render(<UrlCard {...mockValidCard} originalUrl={VALID_URL_US} />)

        const button = screen.getByTestId('delete-button')

        expect(button).toBeInTheDocument()
    })

    test('should delete a card', () => {
        const spyDelete = jest.spyOn(mockValidCard, 'handleDeleteUrl')

        render(<UrlCard {...mockValidCard} originalUrl={VALID_URL_US} />)

        const button = screen.getByTestId('delete-button')
        userEvent.click(button)

        expect(spyDelete).toBeCalledTimes(1)
    })
})
