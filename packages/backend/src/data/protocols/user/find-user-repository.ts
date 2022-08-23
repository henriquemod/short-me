import {
  InputFindUserDto,
  OutputFindUserDto
} from '../../../domain/usecase/user'

export interface FindUserRepository {
  find: (input: InputFindUserDto) => Promise<OutputFindUserDto>
}
