import { check } from 'k6'
import { IHandleCheck, IUrl } from '../types'

export const handleCheck = ({
    title,
    res,
    expectedStatus,
    kind,
    cb
}: IHandleCheck) =>
    check(
        res,
        {
            [title]: res =>
                cb ? cb(res, expectedStatus) : res.status === expectedStatus
        },
        { kind }
    )

export const convertToIUrl = (data: Record<string, string>): IUrl => {
    if ('id' in data && 'url' in data && 'key' in data) {
        const { id, url, key } = data
        return {
            id,
            url,
            key
        }
    } else {
        console.log({ data })
        throw new Error('Invalid return')
    }
}
