import { InputCreateUserDto, OutputCreateUserDto } from '.'

export interface CreateUser {
  create: (input: InputCreateUserDto) => Promise<OutputCreateUserDto>
}
