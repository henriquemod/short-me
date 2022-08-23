import argon2 from 'argon2'
import { v4 as uuid } from 'uuid'
import { UserRepositoryInterface } from '../../../domain/interface/user-repository-interface'
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
} from '../../../domain/usecase/user'
import { Encrypter } from '../../../presentation/protocols'
import userModel from '../model/user-model'

export default class UserRepository implements UserRepositoryInterface {
  constructor(private readonly encrypter: Encrypter) {}

  async create(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    const hashedPassword = await this.encrypter.encrypt(input.password)
    const userCreated = await userModel.save({
      id: uuid(),
      username: input.username,
      password: hashedPassword
    })

    return {
      id: userCreated.id,
      username: userCreated.username
    }
  }

  async update(input: InputUpdateUserDto): Promise<OutputUpdateUserDto> {
    // const hashedPassword = await argon2.hash(input.password)
    const update = await userModel.update(input.id, {
      username: input.username
    })

    if (update.affected === 0) {
      throw new Error("User doesn't exist")
    }
    const user = await this.find({ id: input.id })

    if (!user) {
      throw new Error("User doesn't exist")
    }

    return {
      id: user.id,
      username: user.username
    }
  }

  async updatePassword(
    input: InputUpdatePasswordDto
  ): Promise<OutputUpdateUserDto> {
    const user = await this.find({ id: input.id })
    if (!user) {
      throw new Error("User doesn't exist")
    }

    const isValid = await this.encrypter.compare(
      user.password,
      input.currentPassword
    )
    if (!isValid) {
      throw new Error('Invalid password')
    }

    const hashedPassword = await argon2.hash(input.newPassword)
    await userModel.update(input.id, {
      password: hashedPassword
    })

    return {
      id: user.id,
      username: user.username
    }
  }

  async delete({ id }: InputDeleteUserDto): Promise<OutputDeleteUserDto> {
    const user = await this.find({ id })
    if (user) {
      await userModel.delete(user)
      return {
        deleted: true
      }
    }
    return {
      deleted: false
    }
  }

  async find({ id }: InputFindUserDto): Promise<OutputFindUserDto | undefined> {
    const result = await userModel.findOne({ where: { id } })
    if (result) {
      return {
        id: result.id,
        username: result.username,
        password: result.password
      }
    }
  }

  async findAll(): Promise<OutputFindAllUsersDto> {
    const users = await userModel.find()

    return {
      users: users.map((user) => ({
        id: user.id,
        username: user.username
      }))
    }
  }
}
