import { AlertColor } from '@mui/material'
import { act } from '@testing-library/react'
import ReactDOM from 'react-dom/client'
import { IUrl } from '../../lib/hooks/useUrl'
import { UrlList } from '../url-list'

globalThis.IS_REACT_ACT_ENVIRONMENT = true
let container: HTMLDivElement
beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

const generateFakeData = (size: number): IUrl[] => {
    let data: IUrl[] = []
    for (let i = 0; i < size; i++) {
        data.push({
            id: i.toString(),
            key: '222',
            url: 'https://validurl.com'
        })
    }

    return data
}

const mockUrlList: IUrl[] = generateFakeData(3)

const handleDeleteUrlStub = (id: string) => Promise.resolve()
const notifyStub = (_: string, __: AlertColor) => {}
const copyToClipboardStub = (_: string) => {}
const setLockStub = (_: boolean) => {}

const Sut = {
    itens: mockUrlList,
    handleDeleteUrl: handleDeleteUrlStub,
    notify: notifyStub,
    copyToClipboard: copyToClipboardStub,
    setLock: setLockStub
}

describe('Url list unit tests', () => {
    test('should display a list of urls', () => {
        act(() => {
            ReactDOM.createRoot(container).render(<UrlList {...Sut} />)
        })

        const input = container.querySelectorAll('.url-card')

        expect(input.length).toEqual(3)
    })
})
