import {
  InputDeleteUserDto,
  OutputDeleteUserDto
} from '../../../domain/usecase/user'

export interface DeleteUserRepository {
  delete: (input: InputDeleteUserDto) => Promise<OutputDeleteUserDto>
}
