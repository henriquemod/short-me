import {
  InputFindUrlDto,
  OutputFindUrlDto
} from '../../../../domain/usecase/url'
import { FindAllUrls, FindUrl } from '../../../../domain/usecase/url/url'
import { MissingParamError } from '../../../../presentation/error'
import {
  badRequest,
  ok,
  serverError,
  notFoundRequest
} from '../../../../presentation/helpers/http-helper'
import FindAllUrlsController from '../../../../presentation/controllers/url/find-all-urls'
import { HttpRequest, HttpResponse } from '../../../../presentation/protocols'
import { ExceptionHandler } from '../../../../presentation/protocols/exception-handler'

interface SutTypes {
  sut: FindAllUrlsController
  findAllUrlsStub: FindAllUrls
}

interface OverrideTypes {
  id?: string
  url?: string
  key?: string
}

const makeFakeRequest = (props?: OverrideTypes): HttpRequest => ({})

const makeFakeBodyResponse = (props?: OverrideTypes): HttpResponse['body'] => ({
  id: 'any_id',
  url: 'original_url',
  key: 'url_key',
  ...props
})

// const makeFakeBodyResponse = (props?: OverrideTypes): HttpResponse['body'] => []

const makeFindAllUrls = (): FindAllUrls => {
  class FindAllUrlsStub implements FindAllUrls {
    async findAll(): Promise<OutputFindUrlDto[]> {
      return new Promise((resolve) => resolve([]))
    }
  }
  return new FindAllUrlsStub()
}

const makeExceptionHandler = (): ExceptionHandler => {
  class ExceptionHandlerStub implements ExceptionHandler {
    validate = (_: Error) => jest.fn()
  }

  return new ExceptionHandlerStub()
}

const makeSut = (): SutTypes => {
  const findAllUrlsStub = makeFindAllUrls()
  const exceptionHandlerStub = makeExceptionHandler()
  const sut = new FindAllUrlsController(findAllUrlsStub, exceptionHandlerStub)
  return {
    sut,
    findAllUrlsStub
  }
}

describe('Find Url Controller', () => {
  it('should return empty if no url is added', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse.body.urls).toHaveLength(0)
  })

  it('should return one card if one url is added', async () => {
    const { sut, findAllUrlsStub } = makeSut()

    jest
      .spyOn(findAllUrlsStub, 'findAll')
      .mockResolvedValue([makeFakeBodyResponse(), makeFakeBodyResponse()])

    const httpResponse = await sut.handle({})

    expect(httpResponse.body.urls).toHaveLength(2)
  })

  it('should return 500 if FindAllUrls throws', async () => {
    const { sut, findAllUrlsStub } = makeSut()

    jest.spyOn(findAllUrlsStub, 'findAll').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
