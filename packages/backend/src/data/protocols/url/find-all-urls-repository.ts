import { OutputFindUrlDto } from '../../../domain/usecase/url'

export interface FindAllUrlsRepository {
  findAll: () => Promise<OutputFindUrlDto[]>
}
