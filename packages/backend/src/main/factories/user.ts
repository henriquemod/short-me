import { EncrypterAdapter } from '../../@core/lib/encrypter/encrypter-adapter'
import { LogPGRepository } from '../../infra/bd/log-repository'
import UserRepository from '../../infra/user/repository/user-repository'
import CreateUserController from '../../presentation/controllers/user/create-user'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'

const encrypter = new EncrypterAdapter()

export const makeUserController = (): Controller => {
  const userRepository = new UserRepository(encrypter)
  const logErrorRepository = new LogPGRepository()

  const createUserController = new CreateUserController(userRepository)

  return new LogControllerDecorator(createUserController, logErrorRepository)
}
