import { sleep, check } from 'k6'

import http from 'k6/http'
import config from '../config'

const PATH = '/api/url/'

export default () => {
    const res = http.post(config.endpoint + PATH + 'someId')
    check(res, {
        'status is 404': () => res.status === 404
    })
    sleep(1)
}
