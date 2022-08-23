import {
  InputUpdatePasswordDto,
  InputUpdateUserDto,
  OutputUpdateUserDto
} from '../../../domain/usecase/user'

export interface UpdateUserRepository {
  update: (input: InputUpdateUserDto) => Promise<OutputUpdateUserDto>
  updatePassword: (
    input: InputUpdatePasswordDto
  ) => Promise<OutputUpdateUserDto>
}
