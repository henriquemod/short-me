import { sleep } from 'k6'
import http from 'k6/http'
import config from '../config'
import { handleCheck } from './utils'

const ENDPOINT = `${config.endpoint}/api/url`

export default () => {
    const res = http.post(
        ENDPOINT,
        JSON.stringify({
            url: 'www.google.com.br'
        }),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    handleCheck({
        title: 'POST - Status is 200',
        res,
        expectedStatus: 200,
        kind: 'success'
    })

    sleep(1)
}
