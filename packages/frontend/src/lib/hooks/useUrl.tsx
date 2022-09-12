import axios, { AxiosRequestConfig } from 'axios'
import { pipe, reject } from 'ramda'
import { useState } from 'react'
import { Messages } from '../messages'

export interface IUrl {
    id: string
    url: string
    key: string
}

const URL_API_PATH = '/api/url'
const ENDPOINT = process.env.BACKEND_ENDPOINT ?? 'http://localhost:8080'

export const useUrl = () => {
    const [urlList, setUrlList] = useState<IUrl[]>([])
    const [loading, setLoading] = useState(false)

    const create = async (url: string) => {
        try {
            setLoading(true)
            const request = await axios.post<IUrl>(ENDPOINT + URL_API_PATH, {
                url
            })

            if (request.status !== 200)
                throw new Error(Messages.DefaultRequestError)

            setUrlList([...urlList, request.data])
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const remove = async (id: string) => {
        const config: AxiosRequestConfig<any> = {
            data: {
                id
            }
        }
        try {
            setLoading(true)
            const request = await axios.delete<IUrl>(
                process.env.BACKEND_ENDPOINT + URL_API_PATH,
                config
            )

            if (request.status !== 200)
                throw new Error(Messages.DefaultRequestError)

            const wasRemoved = (obj: IUrl) => obj.id === id

            // update url list state
            pipe(reject(wasRemoved), setUrlList)(urlList)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return { create, remove, urlList, loading }
}
