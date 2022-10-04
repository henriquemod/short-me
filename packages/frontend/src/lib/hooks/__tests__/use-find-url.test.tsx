/* eslint-disable import/first */
import { renderHook, waitFor } from '@testing-library/react'
import flushPromises from 'flush-promises'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { act } from 'react-dom/test-utils'
import * as hook from '../use-find-url'
jest.useFakeTimers()

const server = setupServer(
    rest.get('http://localhost:8080/api/url/valid_key', (req, res, ctx) => {
        return res(
            ctx.json({
                id: '02f68cc0-db56-4539-9ad9-78905a7fa470',
                url: 'https://www.google.com.br',
                key: 'wLzfZ'
            })
        )
    }),
    rest.get('http://localhost:8080/api/url/invalid_key', (req, res, ctx) => {
        return res(
            ctx.status(404),
            ctx.json({
                errorMessage: 'Not found'
            })
        )
    })
)

beforeEach(() => {
    server.listen()
})

afterEach(() => {
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})

describe('Use Find Url unit test', () => {
    test('shourl call find url', async () => {
        const { result } = renderHook(() => hook.useFindUrl('valid_key'))

        await act(async () => {
            flushPromises()
        })

        expect(result.current.error).not.toBeTruthy()
        expect(result.current.url).toEqual('https://www.google.com.br')
    })

    test('shourl call find url with invalid key', async () => {
        const { result } = renderHook(() => hook.useFindUrl('invalid_key'))

        await act(async () => {
            flushPromises()
        })

        expect(result.current.error).toBeTruthy()
        expect(result.current.url).toBe('')
    })

    test('shourl call handleChangePage', async () => {
        const mockResponse = jest.fn()
        Object.defineProperty(window, 'location', {
            value: {
                hash: {
                    endsWith: mockResponse,
                    includes: mockResponse
                },
                assign: mockResponse
            },
            writable: true
        })
        const { result } = renderHook(() => hook.useFindUrl('valid_key'))

        const spy = jest.spyOn(window.location, 'assign')

        await act(async () => {
            flushPromises()
        })

        await act(async () => {
            result.current.handleChangePage()
        })

        expect(spy).toBeCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('https://www.google.com.br')
    })
})
