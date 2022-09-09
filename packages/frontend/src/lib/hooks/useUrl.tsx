import axios from 'axios'
import { useState } from 'react'
import { Messages } from '../messages'

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
                `${process.env.BACKEND_ENDPOINT}/api/url`,
                {
                    url
                }
            )

            if (request.status !== 200)
                throw new Error(Messages.DefaultRequestError)

            setUrlList([...urlList, request.data])
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return { create, urlList, loading }
}
