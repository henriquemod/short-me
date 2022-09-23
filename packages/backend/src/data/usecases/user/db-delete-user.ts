import {
  InputDeleteUserDto,
  OutputDeleteUserDto
} from '../../../domain/usecase/user'
import { DeleteUser } from '../../../domain/usecase/user/user'

export class DbDeleteUser implements DeleteUser {
  constructor(private readonly deleteUserRepository: DeleteUser) {}

  async delete(input: InputDeleteUserDto): Promise<OutputDeleteUserDto> {
    return this.deleteUserRepository.delete({ id: input.id })
  }
}
