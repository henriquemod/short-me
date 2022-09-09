import { Express, Router } from 'express'
import fb from 'fast-glob'
import env from 'dotenv'
env.config()

export default (app: Express): void => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const router = Router()
  app.use('/api', router)

  const filename = isDevelopment ? '**routes.ts' : '**routes.js'

  fb.sync(`**/${isDevelopment ? 'src' : 'build'}/main/routes/${filename}`).map(
    async (file) => (await import(`../../../${file}`)).default(router)
  )
}
