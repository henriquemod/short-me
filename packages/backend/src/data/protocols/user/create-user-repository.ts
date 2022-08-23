import {
  InputCreateUserDto,
  OutputCreateUserDto
} from '../../../domain/usecase/user'

export interface CreateUserRepository {
  create: (userData: InputCreateUserDto) => Promise<OutputCreateUserDto>
}
