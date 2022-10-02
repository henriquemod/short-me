import { RefinedResponse } from 'k6/http'

export type IKind = 'success' | 'fail'

export interface IHandleCheck {
    title: string
    res: RefinedResponse<'text'>
    expectedStatus: number
    kind: IKind
    cb?: (res: RefinedResponse<'text'>, status: number) => boolean
}

export interface IUrl {
    id: string
    url: string
    key: string
}
