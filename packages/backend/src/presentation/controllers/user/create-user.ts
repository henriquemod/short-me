import { OutputCreateUserDto } from '../../../domain/usecase/user'
import { CreateUser } from '../../../domain/usecase/user/user'
import { CustomMessageError, MissingParamError } from '../../error'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export default class CreateUserController implements Controller {
  constructor(private readonly createUser: CreateUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['username', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { username, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(
          new CustomMessageError('Password confirmation does not match')
        )
      }

      const user = await this.createUser.create({ username, password })

      const userDto: OutputCreateUserDto = {
        id: user.id,
        username: user.username
      }

      return ok(userDto)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
