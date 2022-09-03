import { DataSource } from 'typeorm'
import urlModel from '../../../src/infra/url/model/url-model'
import UrlRepository from '../../../src/infra/url/repository/url-repository'
import { RandomGenerator } from '../../../src/presentation/protocols'

interface SutTypes {
  sut: UrlRepository
  randomGeneratorStub: RandomGenerator
}

const makeRandomGeneratorStub = (): RandomGenerator => {
  class RandomGeneratorStub implements RandomGenerator {
    generate(): string {
      return 'token'
    }
  }

  return new RandomGeneratorStub()
}

const makeSut = (): SutTypes => {
  const randomGeneratorStub = makeRandomGeneratorStub()
  const sut = new UrlRepository(randomGeneratorStub)

  return {
    sut,
    randomGeneratorStub
  }
}

describe('Server repository test', () => {
  let datasource: DataSource

  beforeEach(async () => {
    datasource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [urlModel],
      migrations: [],
      subscribers: []
    })

    await datasource.initialize()
  })

  afterEach(async () => {
    try {
      await datasource.destroy()
    } catch (error) {
      console.log('Error destroying datasource: ', error)
    }
  })

  it('should create a url', async () => {
    const { sut } = makeSut()
    const url = await sut.create({
      url: 'valid_url'
    })

    const foundUrl = await sut.find({ key: url.key })

    expect(foundUrl).toBeDefined()
    if (foundUrl) {
      expect(foundUrl.url).toBe(url.url)
    }
  })

  it('should find a user', async () => {
    const { sut } = makeSut()

    const url = await sut.create({
      url: 'valid_url'
    })

    const foundUrl = await sut.find({ key: url.key })

    expect(foundUrl).toMatchObject({
      id: url.id,
      url: 'valid_url',
      key: url.key
    })
  })
})
