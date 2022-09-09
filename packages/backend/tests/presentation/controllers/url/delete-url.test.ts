import {
  InputDeleteUrlDto,
  OutputDeleteUrlDto
} from '../../../../src/domain/usecase/url'
import { DeleteUrl } from '../../../../src/domain/usecase/url/url'
import { MissingParamError } from '../../../../src/presentation/error'
import {
  badRequest,
  ok,
  serverError
} from '../../../../src/presentation/helpers/http-helper'
import DeleteUrlController from '../../../../src/presentation/controllers/url/delete-url'
import {
  HttpRequest,
  HttpResponse
} from '../../../../src/presentation/protocols'

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
      return await new Promise((resolve) => resolve(makeFakeBodyResponse()))
    }
  }
  return new DeleteUrlStub()
}

const makeSut = (): SutTypes => {
  const deleteUrlStub = makeDeleteUrl()
  const sut = new DeleteUrlController(deleteUrlStub)
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
