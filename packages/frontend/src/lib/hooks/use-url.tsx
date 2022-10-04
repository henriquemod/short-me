import axios, { AxiosRequestConfig } from 'axios'
import { pipe, reject } from 'ramda'
import { useEffect, useState } from 'react'
import { captureException } from '@sentry/react'

export interface IUrl {
    id: string
    url: string
    key: string
}

export interface IUrlList {
    urls: IUrl[]
}

const URL_API_PATH = '/api/url'
const ENDPOINT = process.env.BACKEND_ENDPOINT ?? 'http://localhost:8080'

export const useUrl = () => {
    const [urlList, setUrlList] = useState<IUrl[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get<IUrlList>(ENDPOINT + URL_API_PATH)

            setUrlList(data.urls)
        }

        void getData()
    }, [])

    const create = async (url: string): Promise<IUrl | void> => {
        try {
            setLoading(true)
            const request = await axios.post<IUrl>(ENDPOINT + URL_API_PATH, {
                url
            })

            setUrlList([...urlList, request.data])
            setLoading(false)
            return request.data
        } catch (error) {
            captureException(error)
            setLoading(false)
        }
    }

    const remove = async (id: string) => {
        const config: AxiosRequestConfig = {
            data: {
                id
            }
        }
        try {
            setLoading(true)
            await axios.delete<IUrl>(ENDPOINT + URL_API_PATH, config)

            const wasRemoved = (obj: IUrl) => obj.id === id

            // update url list state
            pipe(reject(wasRemoved), setUrlList)(urlList)
            setLoading(false)
        } catch (error) {
            captureException(error)
        }
    }

    return { create, remove, urlList, loading }
}
