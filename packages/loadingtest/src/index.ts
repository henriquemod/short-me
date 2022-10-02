import { Options } from 'k6/options'
import postUrlTest from './url/post-url-test'
import getUrlTest from './url/get-url-test'

export const options: Options = {
    vus: 50,
    duration: '120s',
    thresholds: {
        'checks{kind:success}': ['rate>0.9']
    },
    ext: {
        loadimpact: {
            projectID: 3603320,
            name: 'Short Me Loading Test'
        }
    }
}

export default () => {
    postUrlTest()
    getUrlTest()
}
