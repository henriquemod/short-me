import { act, renderHook } from '@testing-library/react'
import { useTimer } from '../use-timer'

jest.useFakeTimers()

describe('Timer unit test', () => {
    test('should initialize with correct time', () => {
        const MOCK_TIME = 10
        const { result } = renderHook(() => useTimer({ time: MOCK_TIME }))

        expect(result.current.timeLimit).toBe(10)
    })

    test('should count time', async () => {
        const spyInterval = jest.spyOn(global, 'setInterval')
        const MOCK_TIME = 3
        const { result } = renderHook(() => useTimer({ time: MOCK_TIME }))

        expect(result.current.timeLimit).toBe(3)
        expect(spyInterval).toBeCalledTimes(1)
        await act(async () => {
            for (let i = 0; i < 3; i++) {
                jest.advanceTimersByTime(1000)
                await Promise.resolve()
            }
        })

        expect(spyInterval).toHaveBeenCalledTimes(2)
    })
})
