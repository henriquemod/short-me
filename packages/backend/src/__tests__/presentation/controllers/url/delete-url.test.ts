import {
  InputDeleteUrlDto,
  OutputDeleteUrlDto
} from '../../../../domain/usecase/url'
import { DeleteUrl } from '../../../../domain/usecase/url/url'
import { MissingParamError } from '../../../../presentation/error'
import {
  badRequest,
  notFoundRequest,
  ok,
  serverError
} from '../../../../presentation/helpers/http-helper'
import DeleteUrlController from '../../../../presentation/controllers/url/delete-url'
import { HttpRequest, HttpResponse } from '../../../../presentation/protocols'
import { ExceptionHandler } from '../../../../presentation/protocols/exception-handler'

interface SutTypes {
  sut: DeleteUrlController
  deleteUrlStub: DeleteUrl
}

interface OverrideTypes {
  id?: string
  url?: string
  key?: string
}

const makeFakeRequest = (props?: OverrideTypes): HttpRequest => ({
  body: {
    id: 'any_id',
    ...props
  }
})

const makeFakeBodyResponse = (props?: OverrideTypes): HttpResponse['body'] => ({
  id: 'any_id',
  url: 'original_url',
  key: 'url_key',
  ...props
})

const makeDeleteUrl = (): DeleteUrl => {
  class DeleteUrlStub implements DeleteUrl {
    async delete(_input: InputDeleteUrlDto): Promise<OutputDeleteUrlDto> {
      return new Promise((resolve) => resolve(makeFakeBodyResponse()))
    }
  }
  return new DeleteUrlStub()
}

const makeExceptionHandler = (): ExceptionHandler => {
  class ExceptionHandlerStub implements ExceptionHandler {
    validate = (_: Error) => jest.fn()
  }

  return new ExceptionHandlerStub()
}

const makeSut = (): SutTypes => {
  const deleteUrlStub = makeDeleteUrl()
  const exceptionHandlerStub = makeExceptionHandler()
  const sut = new DeleteUrlController(deleteUrlStub, exceptionHandlerStub)
  return {
    sut,
    deleteUrlStub
  }
}

describe('Delete Url Controller', () => {
  it('should return 400 if no id is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest({ id: undefined }))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  it('should delete a url short if key is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeBodyResponse()))
  })

  it('should return 404 if no id not found', async () => {
    const { sut, deleteUrlStub } = makeSut()
    jest.spyOn(deleteUrlStub, 'delete').mockResolvedValue(undefined)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(notFoundRequest(new Error('Not found')))
  })

  it('should call DeleteUrl with correct values', async () => {
    const { sut, deleteUrlStub } = makeSut()
    const findUrlSpy = jest.spyOn(deleteUrlStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(findUrlSpy).toHaveBeenCalledWith(
      makeFakeRequest({ url: undefined, key: undefined }).body
    )
  })

  it('should return 500 if DeleteUrl throws', async () => {
    const { sut, deleteUrlStub } = makeSut()
    jest.spyOn(deleteUrlStub, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
