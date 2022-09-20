import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import setupMiddleware from '../config/middlewares'
import setupRoutes from '../config/routes'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import config from '../config'

const app = express()
const isDevelopment = config.env === 'development'

console.log(isDevelopment)

if (!isDevelopment) {
  Sentry.init({
    dsn: 'https://57d658c576ac458c90ce6bc6bda11a60@o1410595.ingest.sentry.io/6761333',
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({
        app
      })
    ],
    tracesSampleRate: 1.0
  })

  app.use(Sentry.Handlers.requestHandler())
  app.use(Sentry.Handlers.tracingHandler())
  app.use(Sentry.Handlers.errorHandler())
}

app.use(helmet())
app.use(cookieParser())
app.use(express.json())

setupMiddleware(app)
setupRoutes(app)

export default app
