import { OutputFindAllUsersDto } from '../../../domain/usecase/user'
import { FindAllUsers } from '../../../domain/usecase/user/user'

export class DbFindAllUsers implements FindAllUsers {
  constructor(private readonly findUserRepository: FindAllUsers) {}

  async findAll(): Promise<OutputFindAllUsersDto> {
    return await this.findUserRepository.findAll()
  }
}
