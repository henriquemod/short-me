import {
  InputUpdatePasswordDto,
  InputUpdateUserDto,
  OutputUpdateUserDto
} from '../../../domain/usecase/user'
import { UpdateUser } from '../../../domain/usecase/user/user'

export class DbUpdateUser implements UpdateUser {
  constructor(private readonly updateUserRepository: UpdateUser) {}

  async update(input: InputUpdateUserDto): Promise<OutputUpdateUserDto> {
    return this.updateUserRepository.update(input)
  }

  async updatePassword(
    input: InputUpdatePasswordDto
  ): Promise<OutputUpdateUserDto> {
    return this.updateUserRepository.updatePassword({
      id: input.id,
      currentPassword: input.currentPassword,
      newPassword: input.newPassword
    })
  }
}
