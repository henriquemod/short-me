import { sleep, check } from 'k6'
import http from 'k6/http'
import config from '../config'

const PATH = '/api/url'

export default () => {
    const payload = JSON.stringify({
        url: 'www.google.com.br'
    })

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = http.post(config.endpoint + PATH, payload, params)
    check(
        res,
        {
            'status is 200': () => res.status === 200
        },
        { kind: 'success' }
    )

    sleep(1)
}
