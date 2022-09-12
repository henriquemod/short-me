import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { IUrl } from './useUrl'

const URL_API_PATH = '/api/url/'

export const changePage = (url: string) => window.location.assign(url)

const ENDPOINT = process.env.BACKEND_ENDPOINT ?? 'http://localhost:8080'

export const useFindUrl = (key: string) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [url, setUrl] = useState<string>()

    const findUrl = useCallback(async (key: string) => {
        setLoading(true)
        try {
            const request = await axios.get<IUrl>(ENDPOINT + URL_API_PATH + key)
            setUrl(request.data.url)
            setLoading(false)
            return request.data.url
        } catch (error) {
            setError(true)
            setLoading(false)
            console.log(error)
        }
    }, [])

    useEffect(() => {
        findUrl(key)
    }, [key, findUrl])

    const handleChangePage = useCallback(() => {
        if (url) changePage(url)
    }, [url])

    return {
        url,
        loading,
        error,
        handleChangePage
    }
}
