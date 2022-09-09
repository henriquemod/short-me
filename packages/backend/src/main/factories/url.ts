import { RandomGeneratorAdapter } from '../../@core/lib/random-generator/random-generator-adapter'
import { LogPGRepository } from '../../infra/bd/log-repository'
import UrlRepository from '../../infra/url/repository/url-repository'
import CreateUrlController from '../../presentation/controllers/url/create-url'
import FindUrlController from '../../presentation/controllers/url/find-url'
import DeleteUrlController from '../../presentation/controllers/url/delete-url'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'

const randomGenerator = new RandomGeneratorAdapter()

export const makeUrlController = (): Controller => {
  const urlRepository = new UrlRepository(randomGenerator)
  const logErrorRepository = new LogPGRepository()

  const createUrlController = new CreateUrlController(urlRepository)

  return new LogControllerDecorator(createUrlController, logErrorRepository)
}

export const makeFindUrlController = (): Controller => {
  const urlRepository = new UrlRepository(randomGenerator)
  const logErrorRepository = new LogPGRepository()

  const findUrlController = new FindUrlController(urlRepository)

  return new LogControllerDecorator(findUrlController, logErrorRepository)
}

export const makeDeleteUrlController = (): Controller => {
  const urlRepository = new UrlRepository(randomGenerator)
  const logErrorRepository = new LogPGRepository()

  const deleteUrlController = new DeleteUrlController(urlRepository)

  return new LogControllerDecorator(deleteUrlController, logErrorRepository)
}
