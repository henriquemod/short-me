import morgan from 'morgan'
import { createLogger, format, transports } from 'winston'
import config from './config'

const formats = [
  ...(config.logs.color ? [format.colorize()] : []),
  format.splat(),
  format.simple()
]

const log = createLogger({
  level: config.logs.level,
  transports: [new transports.Console()],
  format: format.combine(...formats)
})

export default log

morgan.token('id', (req) =>
  Array.isArray(req.headers.id) ? req.headers.id[0] : req.headers.id ?? ''
)

export const httpLogger = morgan(':id - :method :url - :response-time', {
  stream: { write: (message: string) => log.info(message) }
})
