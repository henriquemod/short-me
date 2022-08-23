import {
  InputFindUserDto,
  OutputFindUserDto
} from '../../../domain/usecase/user'
import { FindUser } from '../../../domain/usecase/user/user'

export class DbFindUser implements FindUser {
  constructor(private readonly findUserRepository: FindUser) {}

  async find(input: InputFindUserDto): Promise<OutputFindUserDto | undefined> {
    return await this.findUserRepository.find({ id: input.id })
  }
}
