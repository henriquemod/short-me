import { sleep, check } from 'k6'

import http from 'k6/http'
import config from '../config'

const PATH = '/api/url/'

export default () => {
    const responseCallback = http.expectedStatuses(404)

    const resFindOne = http.get(config.endpoint + PATH + 'someId', {
        responseCallback
    })

    const resFindAll = http.get(config.endpoint + PATH)

    check(
        resFindAll,
        {
            'status is 200': res => res.status === 200
        },
        { kind: 'success' }
    )

    check(
        resFindOne,
        {
            'status is 404': res => res.status === 404
        },
        { kind: 'fail' }
    )
    sleep(1)
}
