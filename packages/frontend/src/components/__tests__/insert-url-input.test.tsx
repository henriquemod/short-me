import userEvent from '@testing-library/user-event'
import ReactDOM from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { InsertUrlInput } from '../insert-url-input'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

const handleCreateShortUrlStub = async (_: string) => Promise.resolve()

const handleValidateUrlStub = (_: string) => true

const Sut = {
    validateUrl: handleValidateUrlStub,
    handleCreateShortUrl: handleCreateShortUrlStub
}

let container: HTMLDivElement

const VALID_URL = 'https://validurl.com'

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

describe('Insert URL Input unit tests', () => {
    test('should call handleCreateShortUrl with correct values', async () => {
        const spyCreateShortUrl = jest.spyOn(Sut, 'handleCreateShortUrl')

        act(() => {
            ReactDOM.createRoot(container).render(
                <InsertUrlInput {...Sut} loading={false} />
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

        expect(spyCreateShortUrl).toHaveBeenCalledWith('https://validurl.com')
    })

    test('should call validateUrl with correct values', async () => {
        const spyValidate = jest
            .spyOn(Sut, 'validateUrl')
            .mockReturnValue(false)

        act(() => {
            ReactDOM.createRoot(container).render(
                <InsertUrlInput {...Sut} loading={false} />
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

        expect(spyValidate).toHaveBeenCalledWith('https://validurl.com')
    })
})
