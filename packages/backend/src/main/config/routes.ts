import { Express, Router } from 'express'
import fb from 'fast-glob'
import env from 'dotenv'
env.config()

export default (app: Express): void => {
  const isDevelopment = process.env.ENV === 'development'
  const router = Router()
  app.use('/api', router)

  fb.sync(
    `**/${isDevelopment ? 'src' : 'build'}/main/routes/**routes.+(js|ts)`
  ).map(async (file) => (await import(`../../../${file}`)).default(router))
}
