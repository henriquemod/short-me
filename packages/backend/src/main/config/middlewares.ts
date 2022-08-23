import type { Express } from 'express'
import { contentType, cors } from '../middlewares'
export default (app: Express): void => {
  app.use(cors)
  app.use(contentType)
}
