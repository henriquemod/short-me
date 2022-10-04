import { Container } from '@mui/material'
import {
    act,
    render,
    renderHook,
    screen,
    waitFor
} from '@testing-library/react'
import { useNotification } from '../use-notification'

jest.useFakeTimers()

describe('useNotification hook unit tests', () => {
    test('should show notification', async () => {
        const { result } = renderHook(() => useNotification())
        const spyNotification = jest.spyOn(result.current, 'notify')

        act(() => {
            result.current.notify('Test message', 'success')
        })

        render(<Container>{result.current.snack}</Container>)

        const message = await waitFor(() => screen.findByText('Test message'))

        expect(spyNotification).toBeCalledTimes(1)
        expect(spyNotification).toHaveBeenCalledWith('Test message', 'success')
        expect(message).toBeInTheDocument()
    })

    test('should hide notification', async () => {
        const { result } = renderHook(() => useNotification())
        const spyNotification = jest.spyOn(result.current, 'notify')

        act(() => {
            result.current.notify('Test message', 'success')
        })

        render(<Container>{result.current.snack}</Container>)

        const message = await waitFor(() => screen.findByText('Test message'))
        expect(spyNotification).toBeCalledTimes(1)
        expect(spyNotification).toHaveBeenCalledWith('Test message', 'success')
        expect(message).toBeInTheDocument()

        act(() => {
            jest.advanceTimersByTime(5000)
        })

        render(<Container>{result.current.snack}</Container>)

        setTimeout(async () => {
            const message = await waitFor(() =>
                screen.findByText('Test message')
            )
            expect(message).not.toBeInTheDocument()
        }, 1500)
    })
})
