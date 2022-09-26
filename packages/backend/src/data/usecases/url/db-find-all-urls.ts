import { OutputFindUrlDto } from '../../../domain/usecase/url'
import { FindAllUrls } from '../../../domain/usecase/url/url'

export class DbFindAllUrls implements FindAllUrls {
  constructor(private readonly findAllUrlsRepository: FindAllUrls) {}

  async findAll(): Promise<OutputFindUrlDto[]> {
    return this.findAllUrlsRepository.findAll()
  }
}
