import type { Express } from 'express'
import cors from 'cors'
import { contentType } from '../middlewares'
export default (app: Express): void => {
  app.use(cors())
  app.use(contentType)
}
