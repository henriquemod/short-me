import dotenv from 'dotenv'
import { mergeDeepRight, omit } from 'ramda'
import { Config } from '../infra/@shared/types/express'
dotenv.config()

const DEFAULT_APP_PORT = 8080
const DEFAULT_DB_PORT = 5432
const LOG_LEVEL = getLogLevel(process.env.LOG_LEVEL)

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

const defaultConfig: Config = {
  port: process.env.PORT ? Number(process.env.PORT) : DEFAULT_APP_PORT,
  endpoint: process.env.APP_ENDPOINT ?? 'http://localhost:8080',
  env: process.env.NODE_ENV ?? 'development',
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbPort: process.env.DB_PORT ? Number(process.env.DB_PORT) : DEFAULT_DB_PORT,
  dbName: process.env.DB_NAME ?? 'postgres',
  dbUser: process.env.DB_USER ?? 'postgres',
  dbPwd: process.env.DB_PWD ?? '123456',
  ormType: 'sqlite',
  logs: {
    color: true,
    level: LOG_LEVEL,
    db: LOG_LEVEL === 'debug' && !process.env.OMIT_DB_LOGS
  }
}

const overrideConfig = (env: string): Partial<Config> => {
  switch (env) {
    case 'development':
      return {
        logs: { ...defaultConfig.logs, level: 'error', db: false }
      }
    case 'production':
      return {
        logs: { ...defaultConfig.logs, color: false, db: false },
        ormType: 'postgres'
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
