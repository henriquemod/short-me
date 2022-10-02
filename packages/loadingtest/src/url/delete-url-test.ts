import { sleep } from 'k6'

import http, { RefinedResponse } from 'k6/http'
import config from '../config'
import { IUrl } from '../types'
import { convertToIUrl, handleCheck } from './utils'

const ENDPOINT = `${config.endpoint}/api/url/`

export default () => {
    const params = {
        headers: {
            'Content-Type': 'application/json'
        },
        responseCallback: http.expectedStatuses(200)
    }

    const failParams = {
        ...params,
        responseCallback: http.expectedStatuses(404)
    }

    const resFailDel = http.del(
        ENDPOINT,
        JSON.stringify({
            id: 'f2d54604-c3ec-41ee-97d3-eb99f40e8c2d'
        }),
        failParams
    )

    handleCheck({
        title: 'DELETE - Status is 404',
        res: resFailDel,
        expectedStatus: 404,
        kind: 'fail'
    })

    const currId: string[] = []

    const resPost = http.post(
        ENDPOINT,
        JSON.stringify({
            url: 'www.google.com.br'
        }),
        params
    )

    const handleCallback = (res: RefinedResponse<'text'>, status: number) => {
        currId.push(res.body)
        return res.status === status
    }

    handleCheck({
        title: 'DELETE - Pre create short URL',
        res: resPost,
        expectedStatus: 200,
        kind: 'success',
        cb: handleCallback
    })

    const { id }: IUrl = convertToIUrl(
        JSON.parse(currId[0]) as Record<string, string>
    )

    const delSuccess = http.del(ENDPOINT, JSON.stringify({ id }), params)

    handleCheck({
        title: 'DELETE - Status is 200',
        res: delSuccess,
        expectedStatus: 200,
        kind: 'success'
    })

    sleep(1)
}
