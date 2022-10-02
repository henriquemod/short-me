import { ExceptionHandler } from '../../presentation/protocols/exception-handler'
import { captureException } from '@sentry/node'

export class ExceptionHandlerAdapter implements ExceptionHandler {
  validate = (err: Error): void => {
    if (process.env.NODE_ENV !== 'development') {
      captureException(err)
    }
  }
}
