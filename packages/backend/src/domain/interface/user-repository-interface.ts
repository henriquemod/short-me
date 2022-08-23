import {
  InputCreateUserDto,
  InputDeleteUserDto,
  InputFindUserDto,
  InputUpdatePasswordDto,
  InputUpdateUserDto,
  OutputCreateUserDto,
  OutputDeleteUserDto,
  OutputFindAllUsersDto,
  OutputFindUserDto,
  OutputUpdateUserDto
} from '../usecase/user'

export interface UserRepositoryInterface {
  create: (input: InputCreateUserDto) => Promise<OutputCreateUserDto>
  update: (input: InputUpdateUserDto) => Promise<OutputUpdateUserDto>
  updatePassword: (
    input: InputUpdatePasswordDto
  ) => Promise<OutputUpdateUserDto>
  delete: (input: InputDeleteUserDto) => Promise<OutputDeleteUserDto>
  find: (input: InputFindUserDto) => Promise<OutputFindUserDto | undefined>
  findAll: () => Promise<OutputFindAllUsersDto>
}
