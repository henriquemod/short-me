import { CreateUrlRepository } from '../../../../src/data/protocols/url/create-url-repository'
import { FindUrlRepository } from '../../../../src/data/protocols/url/find-url-repository'
import { DbCreateUrl } from '../../../../src/data/usecases/url/db-create-url'
import { DbFindUrl } from '../../../../src/data/usecases/url/db-find-url'
import {
  InputCreateUrlDto,
  InputFindUrlDto,
  OutputCreateUrlDto,
  OutputFindUrlDto
} from '../../../../src/domain/usecase/url'

interface CreateSutTypes {
  sut: DbCreateUrl
  createUrlRepositorySut: CreateUrlRepository
}

interface FindSutTypes {
  sut: DbFindUrl
  findUrlRepositorySut: FindUrlRepository
}

interface FakeUrlProps {
  id?: string
  url?: string
  key?: string
}

const makeFakeUrlResponse = (props?: FakeUrlProps): OutputCreateUrlDto => ({
  id: 'valid_id',
  url: 'valid_url',
  key: 'valid_key',
  ...props
})

const makeFakeFindUrlResponse = (props?: FakeUrlProps): OutputFindUrlDto => ({
  id: 'valid_id',
  url: 'valid_url',
  key: 'valid_key',
  ...props
})

const makeFakeUrlRequest = (props?: FakeUrlProps): InputCreateUrlDto => ({
  url: 'valid_url',
  key: 'valid_key',
  ...props
})

const makeCreateUrlRepository = (): CreateUrlRepository => {
  class CreateUrlRepositoryStub implements CreateUrlRepository {
    async create(urlData: InputCreateUrlDto): Promise<OutputCreateUrlDto> {
      const fakeUrl = {
        url: urlData.url
      }

      return await new Promise((resolve) =>
        resolve(makeFakeUrlResponse(fakeUrl))
      )
    }
  }

  return new CreateUrlRepositoryStub()
}

const makeFindUrlRepository = (): FindUrlRepository => {
  class FindUrlRepositoryStub implements FindUrlRepository {
    async find(_input: InputFindUrlDto): Promise<OutputFindUrlDto> {
      return await new Promise((resolve) =>
        resolve(Object.assign(makeFakeUrlResponse()))
      )
    }
  }

  return new FindUrlRepositoryStub()
}

const makeCreateSut = (): CreateSutTypes => {
  const createUrlRepositorySut = makeCreateUrlRepository()
  const sut = new DbCreateUrl(createUrlRepositorySut)
  return {
    sut,
    createUrlRepositorySut
  }
}

const makeFindSut = (): FindSutTypes => {
  const findUrlRepositorySut = makeFindUrlRepository()
  const sut = new DbFindUrl(findUrlRepositorySut)
  return {
    sut,
    findUrlRepositorySut
  }
}

describe('Url repository test', () => {
  // NOTE - CREATE URL TESTS
  it('should call CreateUrlRepository with correct values', async () => {
    const { sut, createUrlRepositorySut } = makeCreateSut()
    const createSpy = jest.spyOn(createUrlRepositorySut, 'create')
    const userData = makeFakeUrlRequest({ key: undefined })

    await sut.create(userData)
    expect(createSpy).toHaveBeenCalledWith(userData)
  })

  it('should throw if CreateUrlRepository throws', async () => {
    const { sut, createUrlRepositorySut } = makeCreateSut()
    jest.spyOn(createUrlRepositorySut, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const userData = makeFakeUrlRequest()

    const promise = sut.create(userData)
    await expect(promise).rejects.toThrow()
  })

  it('should return an user if CreateUrlRepository returns an user', async () => {
    const { sut } = makeCreateSut()
    const userData = makeFakeUrlRequest()

    const user = await sut.create(userData)
    expect(user).toEqual(makeFakeUrlResponse())
  })

  // NOTE - FIND URL TESTS
  it('it should find user', async () => {
    const { sut, findUrlRepositorySut } = makeFindSut()
    jest
      .spyOn(findUrlRepositorySut, 'find')
      .mockResolvedValue(makeFakeFindUrlResponse())

    const find = await sut.find({ key: 'valid_key' })

    expect(find).toEqual(makeFakeUrlResponse())
  })

  it('should call find with correct values', async () => {
    const { sut, findUrlRepositorySut } = makeFindSut()
    const findSpy = jest.spyOn(findUrlRepositorySut, 'find')

    await sut.find({ key: 'valid_key' })
    expect(findSpy).toBeCalledWith({ key: 'valid_key' })
  })

  it('should throw if find throws', async () => {
    const { sut, findUrlRepositorySut } = makeFindSut()
    jest.spyOn(findUrlRepositorySut, 'find').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.find({ key: 'valid_key' })
    await expect(promise).rejects.toThrow()
  })
})
