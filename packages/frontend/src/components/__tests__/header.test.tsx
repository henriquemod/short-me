import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../header'

const handleChangeThemeStub = jest.fn()

const Sut = {
    handleChangeTheme: handleChangeThemeStub
}

describe('Header Unit Teste', () => {
    it('should render header', () => {
        render(<Header {...Sut} />)

        const logo = screen.getByText('Short me')

        expect(logo).toBeInTheDocument()
    })

    it('should call handleChangeTheme', () => {
        const changeThemeSpy = jest.spyOn(Sut, 'handleChangeTheme')
        render(<Header {...Sut} />)

        const switchButton = screen.getByRole('theme-switch')

        act(() => userEvent.click(switchButton))

        waitFor(() => {
            expect(changeThemeSpy).toBeCalledTimes(1)
        })
    })
})
