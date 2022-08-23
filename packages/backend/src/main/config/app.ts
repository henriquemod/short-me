import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import setupMiddleware from '../config/middlewares'
import setupRoutes from '../config/routes'

const app = express()

app.use(helmet())
app.use(cookieParser())
app.use(express.json())

setupMiddleware(app)
setupRoutes(app)

export default app
