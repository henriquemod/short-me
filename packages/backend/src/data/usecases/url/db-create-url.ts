import {
  InputCreateUrlDto,
  OutputCreateUrlDto
} from '../../../domain/usecase/url'
import { CreateUrl } from '../../../domain/usecase/url/url'

export class DbCreateUrl implements CreateUrl {
  constructor(private readonly createUserRepository: CreateUrl) {}

  async create(input: InputCreateUrlDto): Promise<OutputCreateUrlDto> {
    return await this.createUserRepository.create({
      url: input.url
    })
  }
}
