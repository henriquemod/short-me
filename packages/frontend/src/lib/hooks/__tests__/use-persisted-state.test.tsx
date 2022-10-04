import { act, renderHook, waitFor } from '@testing-library/react'
import usePersistedState from '../use-persisted-state'

const INITIAL_STATE = 'state'
const UPDATED_STATE = 'updated'
const KEY = 'test-key'

describe('usePersistedState hook unit test', () => {
    it('should change state', () => {
        const { result } = renderHook(() =>
            usePersistedState<string>(KEY, INITIAL_STATE)
        )

        act(() => {
            result.current[1](UPDATED_STATE)
        })

        waitFor(() => {
            expect(result.current[0]).toEqual(UPDATED_STATE)
        })
    })

    it('should get initial state', async () => {
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(
            '{"title":"dark"}'
        )

        const { result } = renderHook(() =>
            usePersistedState<string>(KEY, INITIAL_STATE)
        )

        waitFor(() => {
            expect(result.current[0]).toEqual('{"title":"dark"}')
        })
    })
})
