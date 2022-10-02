import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'
import { captureException } from '@sentry/node'

export class LogPGRepository implements LogErrorRepository {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async logError(stack: string): Promise<void> {
    await Promise.resolve(captureException(stack))
  }
}
