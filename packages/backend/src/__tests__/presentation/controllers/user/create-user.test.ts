import {
  InputCreateUserDto,
  OutputCreateUserDto
} from '../../../../domain/usecase/user'
import { CreateUser } from '../../../../domain/usecase/user/user'
import {
  CustomMessageError,
  MissingParamError
} from '../../../../presentation/error'
import {
  badRequest,
  ok,
  serverError
} from '../../../../presentation/helpers/http-helper'
import CreateUserController from '../../../../presentation/controllers/user/create-user'
import { HttpRequest, HttpResponse } from '../../../../presentation/protocols'

interface SutTypes {
  sut: CreateUserController
  createUserStub: CreateUser
}

interface OverrideTypes {
  id?: string
  username?: string
  password?: string
  passwordConfirmation?: string
}

const makeFakeRequest = (props?: OverrideTypes): HttpRequest => ({
  body: {
    username: 'any_name',
    password: 'any_password',
    passwordConfirmation: 'any_password',
    ...props
  }
})

const makeFakeBodyResponse = (props?: OverrideTypes): HttpResponse['body'] => ({
  id: 'any_id',
  username: 'any_name',
  ...props
})

const makeCreateUser = (): CreateUser => {
  class CreateUserStub implements CreateUser {
    async create(_input: InputCreateUserDto): Promise<OutputCreateUserDto> {
      return await new Promise((resolve) => resolve(makeFakeBodyResponse()))
    }
  }
  return new CreateUserStub()
}

const makeSut = (): SutTypes => {
  const createUserStub = makeCreateUser()
  const sut = new CreateUserController(createUserStub)
  return {
    sut,
    createUserStub
  }
}

describe('Create User Controller', () => {
  it('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(
      makeFakeRequest({ username: undefined })
    )
    expect(httpResponse).toEqual(badRequest(new MissingParamError('username')))
  })

  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(
      makeFakeRequest({ password: undefined })
    )
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  it('should return 400 if no password confirmation is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(
      makeFakeRequest({ passwordConfirmation: undefined })
    )
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('passwordConfirmation'))
    )
  })

  it('should return 400 if no password is not equals to confirmation', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(
      makeFakeRequest({ passwordConfirmation: 'other_password' })
    )
    expect(httpResponse).toEqual(
      badRequest(new CustomMessageError('Password confirmation does not match'))
    )
  })

  it('should create a user if all data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeBodyResponse()))
  })

  it('should call CreateUser with correct values', async () => {
    const { sut, createUserStub } = makeSut()
    const createUserSpy = jest.spyOn(createUserStub, 'create')
    await sut.handle(makeFakeRequest())
    expect(createUserSpy).toHaveBeenCalledWith(
      makeFakeRequest({ passwordConfirmation: undefined }).body
    )
  })

  it('should return 500 if CreateUser throws', async () => {
    const { sut, createUserStub } = makeSut()
    jest.spyOn(createUserStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
