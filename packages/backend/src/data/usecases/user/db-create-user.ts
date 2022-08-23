import {
  InputCreateUserDto,
  OutputCreateUserDto
} from '../../../domain/usecase/user'
import { CreateUser } from '../../../domain/usecase/user/user'
import { Encrypter } from '../../../presentation/protocols/encrypter'

export class DbCreateUser implements CreateUser {
  constructor(
    private readonly createUserRepository: CreateUser,
    private readonly encrypter: Encrypter
  ) {}

  async create(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    const hashedPassword = await this.encrypter.encrypt(input.password)
    return await this.createUserRepository.create({
      username: input.username,
      password: hashedPassword
    })
  }
}
