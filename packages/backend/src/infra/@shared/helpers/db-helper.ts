import { DataSource } from 'typeorm'
import userModel from '../../user/model/user-model'

export const DbHelper = {
  datasource: null as unknown as DataSource,
  async connect(): Promise<void> {
    this.datasource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [userModel],
      migrations: [],
      subscribers: []
    })

    await this.datasource.initialize()
  },

  async disconnect(): Promise<void> {
    await this.datasource.destroy()
  }
}
