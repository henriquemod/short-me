import type { Config } from 'jest'

const config: Config = {
    verbose: true,
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 95,
            functions: 100,
            lines: 100
        }
    },
    collectCoverage: true
}

export default config
