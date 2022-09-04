import axios from 'axios'
import { useState } from 'react'

export interface IUrl {
    id: string
    url: string
    key: string
}

export const useUrl = () => {
    const [urlList, setUrlList] = useState<IUrl[]>([])
    const [loading, setLoading] = useState(false)
    const create = async (url: string) => {
        try {
            setLoading(true)
            const request = await axios.post<IUrl>(
                'http://localhost:8080/api/url',
                {
                    url
                }
            )

            setTimeout(() => {
                console.log('oi')
                setUrlList([...urlList, request.data])
                setLoading(false)
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }

    return { create, urlList, loading }
}
