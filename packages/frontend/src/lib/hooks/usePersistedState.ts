/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect } from 'react'

type Response<T> = [T, (state: T) => void]

function usePersistedState<T>(key: string, initialState: T): Response<T> {
    const [theme, setTheme] = useState(() => {
        const storageValue = localStorage.getItem(key)

        if (storageValue) {
            return JSON.parse(storageValue)
        } else {
            return initialState
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(theme))
    }, [key, theme])

    const handleChangeTheme = (newState: T) => {
        setTheme(newState)
    }

    return [theme, handleChangeTheme]
}

export default usePersistedState
