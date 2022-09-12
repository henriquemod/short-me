import { useEffect, useState } from 'react'

const INITIAL_TIME = 100

interface IProps {
    time?: number | undefined
}

export const useTimer = (props?: IProps) => {
    const [timeLimit, setTimeLimit] = useState(props?.time ?? INITIAL_TIME)
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLimit(prev => (prev === 0 ? 0 : prev - 10))
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [timeLimit])

    return { timeLimit }
}
