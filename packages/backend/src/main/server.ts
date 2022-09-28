import { createServer } from 'http'
import { DataSource, DataSourceOptions } from 'typeorm'
import urlModel from '../infra/url/model/url-model'
import userModel from '../infra/user/model/user-model'
import config from './config'
import app from './config/app'
import log from './logger'
import { captureException } from '@sentry/node'

log.info(`Process id: ${process.pid}`)

const server = createServer(app)
const isDevelopment = config.env === 'development'

const typeOrmSettingsDefault: DataSourceOptions = {
  type: config.ormType,
  synchronize: true,
  logging: true,
  entities: [userModel, urlModel],
  migrations: [],
  subscribers: [],
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPwd,
  database: config.dbName
}

const ormSettings: DataSourceOptions = isDevelopment
  ? Object.assign({}, typeOrmSettingsDefault, { database: ':memory:' })
  : typeOrmSettingsDefault

const datasource = new DataSource(ormSettings)

const start = async (): Promise<void> => {
  await datasource.initialize()
  server.listen(config.port, () => {
    log.info(`Server running at port ${config.port}`)
  })
}

start().catch((err) => {
  if (!isDevelopment) captureException(err)
  process.exit(1)
})
