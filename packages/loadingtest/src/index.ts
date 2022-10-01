import { Options } from 'k6/options'
import getUrl200Test from './url/get-200-status-test'
import getUrl404Test from './url/get-404-status-test'

export const options: Options = {
    vus: 500,
    duration: '10s',
    thresholds: {
        // http errors should be less than 5%
        http_req_failed: ['rate<0.05']
    },
    ext: {
        loadimpact: {
            projectID: 3603320,
            name: 'Short Me Loading Test'
        }
    }
}

export default () => {
    getUrl200Test()
    getUrl404Test()
}
