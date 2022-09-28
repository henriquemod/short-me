import { DataSource } from 'typeorm'

export interface Config {
  port: number
  endpoint: string
  env: string
  dbHost: string
  dbPort: number
  dbName: string
  dbUser: string
  dbPwd: string
  ormType: 'sqlite' | 'postgres'
  logs: {
    color: boolean
    level: 'crit' | 'error' | 'warning' | 'info' | 'debug'
    db: boolean
  }
}

export interface IRouteProps {
  config: Config
  db: DataSource
}
