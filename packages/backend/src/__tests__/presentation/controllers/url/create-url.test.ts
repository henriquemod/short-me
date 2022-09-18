import {
  InputCreateUrlDto,
  OutputCreateUrlDto
} from '../../../../domain/usecase/url'
import { CreateUrl } from '../../../../domain/usecase/url/url'
import { MissingParamError } from '../../../../presentation/error'
import {
  badRequest,
  ok,
  serverError
} from '../../../../presentation/helpers/http-helper'
import CreateUrlController from '../../../../presentation/controllers/url/create-url'
import { HttpRequest, HttpResponse } from '../../../../presentation/protocols'
import { InvalidParamError } from '../../../../presentation/error/invalid-param-error'
import { UrlValidator } from '../../../../presentation/protocols/url-validator'

interface SutTypes {
  sut: CreateUrlController
  createUrlStub: CreateUrl
  urlValidatorStub: UrlValidator
}

interface OverrideTypes {
  id?: string
  url?: string
  urlShort?: string
}

const makeFakeRequest = (props?: OverrideTypes): HttpRequest => ({
  body: {
    url: 'valid_url',
    ...props
  }
})

const makeFakeBodyResponse = (props?: OverrideTypes): HttpResponse['body'] => ({
  id: 'any_id',
  url: 'original_url',
  key: 'url_key',
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

const makeValidator = (): UrlValidator => {
  class ValidatorStub implements UrlValidator {
    validate(_: any): boolean {
      return true
    }
  }

  return new ValidatorStub()
}

const makeSut = (): SutTypes => {
  const createUrlStub = makeCreateUrl()
  const urlValidatorStub = makeValidator()
  const sut = new CreateUrlController(createUrlStub, urlValidatorStub)
  return {
    sut,
    createUrlStub,
    urlValidatorStub
  }
}

describe('Create Url Controller', () => {
  it('should return 400 if no url is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest({ url: undefined }))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('url')))
  })

  it('should return 400 if invalid url is provided', async () => {
    const { sut, urlValidatorStub } = makeSut()
    jest.spyOn(urlValidatorStub, 'validate').mockReturnValueOnce(false)
    const httpResponse = await sut.handle(
      makeFakeRequest({ url: 'invalid_url' })
    )
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('url')))
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
