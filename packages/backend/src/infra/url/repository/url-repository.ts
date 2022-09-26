import { v4 as uuid } from 'uuid'
import { UrlRepositoryInterface } from '../../../domain/interface/url-repository-interface'
import {
  InputCreateUrlDto,
  InputFindUrlDto,
  OutputCreateUrlDto,
  OutputFindUrlDto,
  InputDeleteUrlDto,
  OutputDeleteUrlDto
} from '../../../domain/usecase/url'
import { RandomGenerator } from '../../../presentation/protocols'
import urlModel from '../model/url-model'

export default class UrlRepository implements UrlRepositoryInterface {
  constructor(private readonly randomGenerator: RandomGenerator) {}

  async create(input: InputCreateUrlDto): Promise<OutputCreateUrlDto> {
    const key = this.randomGenerator.generate()
    const urlCreated = await urlModel.save({
      id: uuid(),
      url: input.url,
      key
    })

    return {
      id: urlCreated.id,
      url: urlCreated.url,
      key: urlCreated.key
    }
  }

  async find({ key }: InputFindUrlDto): Promise<OutputFindUrlDto | undefined> {
    const result = await urlModel.findOne({ where: { key } })
    if (result) {
      return {
        id: result.id,
        url: result.url,
        key: result.key
      }
    }
  }

  async findAll(): Promise<OutputFindUrlDto[]> {
    const result = await urlModel.find()
    return result.map(({ id, url, key }) => ({ id, url, key }))
  }

  async delete({ id }: InputDeleteUrlDto): Promise<OutputDeleteUrlDto> {
    const find = await urlModel.findOneOrFail({ where: { id } })
    await urlModel.delete({ id: find.id })
    return {
      id: find.id,
      url: find.url,
      key: find.key
    }
  }
}
