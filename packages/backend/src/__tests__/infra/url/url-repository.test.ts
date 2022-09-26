import { DataSource } from 'typeorm'
import urlModel from '../../../infra/url/model/url-model'
import UrlRepository from '../../../infra/url/repository/url-repository'
import { RandomGenerator } from '../../../presentation/protocols'

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

  it('should find a url', async () => {
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

  it('should find all urls', async () => {
    const { sut } = makeSut()

    await sut.create({ url: 'valid_url' })
    await sut.create({ url: 'valid_url2' })

    const urls = await sut.findAll()

    expect(urls).toHaveLength(2)
    expect(urls[0].url).toEqual('valid_url')
    expect(urls[1].url).toEqual('valid_url2')
  })

  it('should delete a url', async () => {
    const { sut } = makeSut()

    const url = await sut.create({
      url: 'valid_url'
    })

    const foundUrl = await sut.delete({ id: url.id })

    expect(foundUrl).toMatchObject({
      id: url.id,
      url: 'valid_url',
      key: url.key
    })
  })
})
