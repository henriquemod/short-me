import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReactDOM from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { UrlLoader } from '../url-loader'

Enzyme.configure({ adapter: new Adapter() })

globalThis.IS_REACT_ACT_ENVIRONMENT = true
let container: HTMLDivElement
beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

const handleChangePageStub = (_: string) => {}

const Sut = {
    handleChangePage: handleChangePageStub
}

describe('Url list unit tests', () => {
    test('should render loader', () => {
        act(() => {
            ReactDOM.createRoot(container).render(<UrlLoader {...Sut} />)
        })
    })

    test('should render with url link disabled', () => {
        const wrapper = shallow(<UrlLoader {...Sut} />)
        const button = wrapper.find('#url-button')
        const txt = button.text()
        expect(txt).toEqual('Just a second...')
    })

    test('should enable url link', async () => {
        const wrapper = shallow(<UrlLoader time={0} {...Sut} />)
        const button = wrapper.find('#url-button')
        const txt = button.text()
        expect(txt).toEqual('Open link')
    })

    test('should be able to click in url link', async () => {
        const wrapper = shallow(<UrlLoader time={0} {...Sut} />)
        const button = wrapper.find('#url-button')
        const txt = button.text()
        expect(txt).toEqual('Open link')
        button.simulate('click')
    })
})
