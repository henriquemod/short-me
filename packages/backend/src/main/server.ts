import { createServer } from 'http'
import { DataSource, DataSourceOptions } from 'typeorm'
import urlModel from '../infra/url/model/url-model'
import userModel from '../infra/user/model/user-model'
import config from './config'
import app from './config/app'
import log from './logger'

log.info(`Process id: ${process.pid}`)

const server = createServer(app)

const typeOrmSettingsDev: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [userModel, urlModel],
  migrations: [],
  subscribers: []
}

const typeOrmSettingsHml: DataSourceOptions = {
  type: 'postgres',
  synchronize: true,
  logging: true,
  entities: [userModel, urlModel],
  migrations: [],
  subscribers: [],
  host: config.dbHost,
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'postgres'
}

const datasource = new DataSource(
  config.env === 'development' ? typeOrmSettingsDev : typeOrmSettingsHml
)

const start = async (): Promise<void> => {
  await datasource.initialize()
  server.listen(config.port, () => {
    log.info(`Server running at port ${config.port}`)
  })
}

start().catch((err) => {
  log.error(err)
  log.error(err.stack)
  process.exit(1)
})
