import type { Config } from 'jest'

const config: Config = {
    verbose: true,
    coverageThreshold: {
        global: {
            statements: -5,
            branches: 100,
            functions: 100,
            lines: 100
        }
    },
    collectCoverage: true
}

export default config
