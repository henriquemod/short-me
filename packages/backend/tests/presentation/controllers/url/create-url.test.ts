import {
  InputCreateUrlDto,
  OutputCreateUrlDto
} from '../../../../src/domain/usecase/url'
import { CreateUrl } from '../../../../src/domain/usecase/url/url'
import { MissingParamError } from '../../../../src/presentation/error'
import {
  badRequest,
  ok,
  serverError
} from '../../../../src/presentation/helpers/http-helper'
import CreateUrlController from '../../../../src/presentation/controllers/url/create-url'
import {
  HttpRequest,
  HttpResponse
} from '../../../../src/presentation/protocols'

interface SutTypes {
  sut: CreateUrlController
  createUrlStub: CreateUrl
}

interface OverrideTypes {
  id?: string
  url?: string
  urlShort?: string
}

const makeFakeRequest = (props?: OverrideTypes): HttpRequest => ({
  body: {
    url: 'any_url',
    ...props
  }
})

const makeFakeBodyResponse = (props?: OverrideTypes): HttpResponse['body'] => ({
  id: 'any_id',
  url: 'original_url',
  urlShort: 'shot_url',
  ...props
})

const makeCreateUrl = (): CreateUrl => {
  class CreateUrlStub implements CreateUrl {
    async create(_input: InputCreateUrlDto): Promise<OutputCreateUrlDto> {
      return await new Promise((resolve) => resolve(makeFakeBodyResponse()))
    }
  }
  return new CreateUrlStub()
}

const makeSut = (): SutTypes => {
  const createUrlStub = makeCreateUrl()
  const sut = new CreateUrlController(createUrlStub)
  return {
    sut,
    createUrlStub
  }
}

describe('Create User Controller', () => {
  it('should return 400 if no url is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest({ url: undefined }))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('url')))
  })

  it('should create a url short if all data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeBodyResponse()))
  })

  it('should call CreateUrl with correct values', async () => {
    const { sut, createUrlStub } = makeSut()
    const createUrlSpy = jest.spyOn(createUrlStub, 'create')
    await sut.handle(makeFakeRequest())
    expect(createUrlSpy).toHaveBeenCalledWith(
      makeFakeRequest({ urlShort: undefined, id: undefined }).body
    )
  })

  it('should return 500 if CreateUser throws', async () => {
    const { sut, createUrlStub } = makeSut()
    jest.spyOn(createUrlStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
