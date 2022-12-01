import { Options } from 'k6/options'
import deleteUrlTest from './url/delete-url-test'
import postUrlTest from './url/post-url-test'
import getUrlTest from './url/get-url-test'
import config from './config'

export const options: Options = {
    vus: config.vus,
    duration: config.k6Time,
    thresholds: {
        'checks{kind:success}': ['rate>0.9']
    },
    ext: {
        loadimpact: {
            projectID: 3612858,
            name: 'Short Me Loading Test'
        }
    }
}

export default () => {
    postUrlTest()
    getUrlTest()
    deleteUrlTest()
}
