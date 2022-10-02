interface Config {
    endpoint: string
    vus: number
    k6Time: string
}

enum Defaults {
    ENDPOINT = 'http://localhost:8080',
    VUS = 1,
    K6TIME = '10s'
}

const config: Config = {
    endpoint: __ENV.ENDPOINT || Defaults.ENDPOINT,
    vus: __ENV.K6_VUS ? Number(__ENV.K6_VUS) : Defaults.VUS,
    k6Time: __ENV.K6_TIME || Defaults.K6TIME
}

export default config
