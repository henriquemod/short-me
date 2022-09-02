import {
  InputFindUrlDto,
  OutputFindUrlDto
} from '../../../../src/domain/usecase/url'
import { FindUrl } from '../../../../src/domain/usecase/url/url'
import { MissingParamError } from '../../../../src/presentation/error'
import {
  badRequest,
  ok,
  serverError
} from '../../../../src/presentation/helpers/http-helper'
import FindUrlController from '../../../../src/presentation/controllers/url/find-url'
import {
  HttpRequest,
  HttpResponse
} from '../../../../src/presentation/protocols'

interface SutTypes {
  sut: FindUrlController
  findUrlStub: FindUrl
}

interface OverrideTypes {
  id?: string
  url?: string
  key?: string
}

const makeFakeRequest = (props?: OverrideTypes): HttpRequest => ({
  body: {
    key: 'any_key',
    ...props
  }
})

const makeFakeBodyResponse = (props?: OverrideTypes): HttpResponse['body'] => ({
  id: 'any_id',
  url: 'original_url',
  key: 'url_key',
  ...props
})

const makeFindUrl = (): FindUrl => {
  class FindUrlStub implements FindUrl {
    async find(_input: InputFindUrlDto): Promise<OutputFindUrlDto> {
      return await new Promise((resolve) => resolve(makeFakeBodyResponse()))
    }
  }
  return new FindUrlStub()
}

const makeSut = (): SutTypes => {
  const findUrlStub = makeFindUrl()
  const sut = new FindUrlController(findUrlStub)
  return {
    sut,
    findUrlStub
  }
}

describe('Find Url Controller', () => {
  it('should return 400 if no key is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest({ key: undefined }))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('key')))
  })

  it('should find a url short if key is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeBodyResponse()))
  })

  it('should call FindUrl with correct values', async () => {
    const { sut, findUrlStub } = makeSut()
    const findUrlSpy = jest.spyOn(findUrlStub, 'find')
    await sut.handle(makeFakeRequest())
    expect(findUrlSpy).toHaveBeenCalledWith(
      makeFakeRequest({ url: undefined, id: undefined }).body
    )
  })

  it('should return 500 if FindUser throws', async () => {
    const { sut, findUrlStub } = makeSut()
    jest.spyOn(findUrlStub, 'find').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
