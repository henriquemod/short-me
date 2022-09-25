import { render, renderHook, waitFor } from '@testing-library/react'
import { useNotification } from '../../hooks/useNotification'
import AppContext, { IAppContext } from '../app-context'

const mockAppSettings: IAppContext = {
    notify: jest.fn()
}

describe('App context unit tests', () => {
    test('notify should be truly', async () => {
        const { result } = renderHook(() => useNotification())

        const child = (
            <div>
                <h1>test</h1>
                {result.current.snack}
            </div>
        )

        render(
            <AppContext.Provider value={mockAppSettings}>
                {child}
            </AppContext.Provider>
        )

        await waitFor(() => {
            expect(result.current.notify).toBeTruthy()
        })
    })
})
