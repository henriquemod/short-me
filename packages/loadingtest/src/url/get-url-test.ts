import { sleep } from 'k6'
import http from 'k6/http'
import config from '../config'
import { handleCheck } from './utils'

const ENDPOINT = `${config.endpoint}/api/url`

export default () => {
    const responseCallback = http.expectedStatuses(404)

    const resFindOne = http.get(ENDPOINT + '/someId', { responseCallback })
    const resFindAll = http.get(ENDPOINT)

    handleCheck({
        title: 'GET - Status is 200',
        res: resFindAll,
        expectedStatus: 200,
        kind: 'success'
    })

    handleCheck({
        title: 'GET - Status is 404',
        res: resFindOne,
        expectedStatus: 404,
        kind: 'fail'
    })

    sleep(1)
}
