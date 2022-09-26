import { renderHook } from '@testing-library/react'
import flushPromises from 'flush-promises'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { act } from 'react-dom/test-utils'
import { IUrl, IUrlList, useUrl } from '../useUrl'

const server = setupServer(
    rest.get<IUrlList>('http://localhost:8080/api/url', (_, res, ctx) => {
        return res(
            ctx.json({
                urls: []
            })
        )
    }),
    rest.post<IUrl>('http://localhost:8080/api/url', (req, res, ctx) => {
        if (req.body.url === '') {
            return res(
                ctx.status(404),
                ctx.json({
                    errorMessage: 'Not found'
                })
            )
        } else {
            return res(
                ctx.json({
                    id: '02f68cc0-db56-4539-9ad9-78905a7fa470',
                    url: 'https://www.google.com.br',
                    key: 'wLzfZ'
                })
            )
        }
    }),
    rest.delete<IUrl>('http://localhost:8080/api/url', (req, res, ctx) => {
        if (req.body.id === 'invalid_id') {
            return res(
                ctx.status(404),
                ctx.json({
                    errorMessage: 'Not found'
                })
            )
        } else {
            return res(
                ctx.json({
                    id: '02f68cc0-db56-4539-9ad9-78905a7fa470',
                    url: 'https://www.google.com.br',
                    key: 'wLzfZ'
                })
            )
        }
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

describe('Use Url unit test', () => {
    test('should add to url list if request success', async () => {
        const { result } = renderHook(() => useUrl())

        act(() => {
            result.current.create('http://google.com.br')
        })

        await act(async () => {
            flushPromises()
        })

        act(() => {
            result.current.create('http://google.com.br')
        })

        await act(async () => {
            flushPromises()
        })

        expect(result.current.urlList).toHaveLength(2)
    })

    test('should not add to url list if request fails ', async () => {
        const { result } = renderHook(() => useUrl())

        act(() => {
            result.current.create('')
        })

        await act(async () => {
            flushPromises()
        })

        expect(result.current.urlList).toHaveLength(0)
    })

    test('should remove a url from list', async () => {
        const { result } = renderHook(() => useUrl())

        act(() => {
            result.current.create('http://google.com.br')
        })

        await act(async () => {
            flushPromises()
        })

        expect(result.current.urlList).toHaveLength(1)

        act(() => {
            result.current.remove('02f68cc0-db56-4539-9ad9-78905a7fa470')
        })

        await act(async () => {
            flushPromises()
        })

        expect(result.current.urlList).toHaveLength(0)
    })

    test('should not remove a url if requests fail', async () => {
        const { result } = renderHook(() => useUrl())

        act(() => {
            result.current.create('http://google.com.br')
        })

        await act(async () => {
            flushPromises()
        })

        expect(result.current.urlList).toHaveLength(1)

        act(() => {
            result.current.remove('invalid_id')
        })

        await act(async () => {
            flushPromises()
        })

        expect(result.current.urlList).toHaveLength(1)
    })
})
