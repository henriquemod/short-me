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
} from '.'

export interface CreateUser {
  create: (input: InputCreateUserDto) => Promise<OutputCreateUserDto>
}

export interface UpdateUser {
  update: (input: InputUpdateUserDto) => Promise<OutputUpdateUserDto>
  updatePassword: (
    input: InputUpdatePasswordDto
  ) => Promise<OutputUpdateUserDto>
}

export interface DeleteUser {
  delete: (input: InputDeleteUserDto) => Promise<OutputDeleteUserDto>
}

export interface FindUser {
  find: (input: InputFindUserDto) => Promise<OutputFindUserDto | undefined>
}

export interface FindAllUsers {
  findAll: () => Promise<OutputFindAllUsersDto>
}
