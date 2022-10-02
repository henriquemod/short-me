import { RandomGeneratorAdapter } from '../../@core/lib/random-generator/random-generator-adapter'
import { LogPGRepository } from '../../infra/bd/log-repository'
import UrlRepository from '../../infra/url/repository/url-repository'
import CreateUrlController from '../../presentation/controllers/url/create-url'
import FindUrlController from '../../presentation/controllers/url/find-url'
import DeleteUrlController from '../../presentation/controllers/url/delete-url'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { UrlValidator } from '../../@core/lib/validator/url'
import FindAllUrlsController from '../../presentation/controllers/url/find-all-urls'
import { ExceptionHandlerAdapter } from '../adapters/exception-handler-adapter'

const randomGenerator = new RandomGeneratorAdapter()

export const makeUrlController = (): Controller => {
  const urlRepository = new UrlRepository(randomGenerator)
  const logErrorRepository = new LogPGRepository()
  const urlValidator = new UrlValidator()
  const exceptionHandler = new ExceptionHandlerAdapter()

  const createUrlController = new CreateUrlController(
    urlRepository,
    urlValidator,
    exceptionHandler
  )

  return new LogControllerDecorator(createUrlController, logErrorRepository)
}

export const makeFindUrlController = (): Controller => {
  const urlRepository = new UrlRepository(randomGenerator)
  const logErrorRepository = new LogPGRepository()
  const exceptionHandler = new ExceptionHandlerAdapter()

  const findUrlController = new FindUrlController(
    urlRepository,
    exceptionHandler
  )

  return new LogControllerDecorator(findUrlController, logErrorRepository)
}

export const makeFindAllUrlsController = (): Controller => {
  const urlRepository = new UrlRepository(randomGenerator)
  const logErrorRepository = new LogPGRepository()
  const exceptionHandler = new ExceptionHandlerAdapter()

  const findAllUrlsController = new FindAllUrlsController(
    urlRepository,
    exceptionHandler
  )

  return new LogControllerDecorator(findAllUrlsController, logErrorRepository)
}

export const makeDeleteUrlController = (): Controller => {
  const urlRepository = new UrlRepository(randomGenerator)
  const logErrorRepository = new LogPGRepository()
  const exceptionHandler = new ExceptionHandlerAdapter()

  const deleteUrlController = new DeleteUrlController(
    urlRepository,
    exceptionHandler
  )

  return new LogControllerDecorator(deleteUrlController, logErrorRepository)
}
