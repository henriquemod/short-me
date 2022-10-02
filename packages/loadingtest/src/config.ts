interface Config {
    endpoint: string
}

const config: Config = {
    endpoint: __ENV.ENDPOINT || 'http://localhost:8080'
}

export default config
