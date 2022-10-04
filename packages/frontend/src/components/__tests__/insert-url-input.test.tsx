import { AlertColor } from '@mui/material'
import userEvent from '@testing-library/user-event'
import ReactDOM from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { IUrl } from '../../lib/hooks/use-url'
import { Messages } from '../../lib/messages'
import { InsertUrlInput } from '../insert-url-input'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

const handleCreateShortUrlStub = async (_: string): Promise<IUrl | void> =>
    Promise.resolve({
        id: 'valid_id',
        url: 'valid_url',
        key: 'valid_key'
    })

const handleValidateUrlStub = (_: string) => true

const notifyStub = (_: string, __: AlertColor) => {}

const Sut = {
    validateUrl: handleValidateUrlStub,
    handleCreateShortUrl: handleCreateShortUrlStub,
    notify: notifyStub,
    lock: false
}

let container: HTMLDivElement
const VALID_URL = 'https://validurl.com'

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

describe('Insert URL Input unit tests', () => {
    test('should call notify with correct values', async () => {
        const spyNotify = jest.spyOn(Sut, 'notify')
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
        expect(spyNotify).toHaveBeenCalledWith(Messages.Success, 'success')
    })
    test('should disable button on loading loading', async () => {
        act(() => {
            ReactDOM.createRoot(container).render(
                <InsertUrlInput {...Sut} loading={true} />
            )
        })
        const input = container.querySelector('#insert-url-2')
        const button = container.querySelector('#insert-button')
        const svg = container.querySelector('#circular-progress')
        expect(input).toHaveAttribute('disabled')
        expect(button).toHaveAttribute('disabled')
        expect(svg).toBeInTheDocument()
    })
    test('should call notify with no url provided message', async () => {
        const spyNotify = jest.spyOn(Sut, 'notify')
        act(() => {
            ReactDOM.createRoot(container).render(
                <InsertUrlInput {...Sut} loading={false} />
            )
        })
        const button = container.querySelector('#insert-button')
        if (button) {
            await act(async () => {
                userEvent.click(button)
            })
        }
        expect(spyNotify).toBeCalledWith(Messages.UrlNotProvided, 'info')
    })
    test('should call notify with network error message', async () => {
        jest.spyOn(Sut, 'handleCreateShortUrl').mockReturnValue(
            Promise.resolve()
        )
        const spyNotify = jest.spyOn(Sut, 'notify')
        act(() => {
            ReactDOM.createRoot(container).render(
                <InsertUrlInput {...Sut} loading={false} />
            )
        })
        const input = container.querySelector('#insert-url-2')
        const button = container.querySelector('#insert-button')
        if (button && input) {
            await act(async () => {
                userEvent.type(input, VALID_URL)
                userEvent.click(button)
            })
        }
        expect(spyNotify).toBeCalledWith(Messages.NetworkRequestError, 'error')
    })
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

    test('should call notify with error if invalid url', async () => {
        const spyNotify = jest.spyOn(Sut, 'notify')
        jest.spyOn(Sut, 'validateUrl').mockImplementation(() => false)
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
        expect(spyNotify).toHaveBeenCalledWith(Messages.DefaultError, 'error')
    })

    test('should call validateUrl with correct values', async () => {
        const spyValidate = jest.spyOn(Sut, 'validateUrl')

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
