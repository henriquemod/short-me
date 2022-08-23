import dotenv from 'dotenv'
import { mergeDeepRight, omit } from 'ramda'
import { Config } from '../infra/@shared/types/express'
dotenv.config()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getLogLevel(level?: string) {
  switch (level) {
    case 'crit':
    case 'error':
    case 'warning':
    case 'info':
      return level
    default:
      return 'debug'
  }
}

const endpoint = process.env.APP_ENDPOINT
const logLevel = getLogLevel(process.env.LOG_LEVEL)

const defaultConfig: Config = {
  port: Number(process.env.PORT) || 8080,
  endpoint: endpoint ?? 'http://localhost',
  env: process.env.NODE_ENV ?? 'development',
  logs: {
    color: true,
    level: logLevel,
    db: logLevel === 'debug' && !process.env.OMIT_DB_LOGS
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function overrideConfig(env: string) {
  switch (env) {
    case 'test':
      return {
        logs: { level: 'error', db: false }
      }
    case 'production':
      return {
        port: process.env.PORT ?? 80,
        endpoint: endpoint ?? 'https://illusiongames.com.br',
        logs: { color: false, db: false }
      }
    default:
      return {}
  }
}

const config = mergeDeepRight(
  defaultConfig,
  overrideConfig(process.env.NODE_ENV ?? 'development')
) as Config

// eslint-disable-next-line
console.log(
  `Using config: ${JSON.stringify(omit(['uploads', 'postgres'], config))}`
)

export default config
