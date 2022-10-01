interface Config {
    endpoint: string
}

const config: Config = {
    endpoint: __ENV.ENDPOINT || 'http://localhost'
}

export default config
