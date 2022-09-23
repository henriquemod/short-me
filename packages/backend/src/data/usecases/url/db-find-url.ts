import { InputFindUrlDto, OutputFindUrlDto } from '../../../domain/usecase/url'
import { FindUrl } from '../../../domain/usecase/url/url'

export class DbFindUrl implements FindUrl {
  constructor(private readonly findUrlRepository: FindUrl) {}

  async find(input: InputFindUrlDto): Promise<OutputFindUrlDto | undefined> {
    return this.findUrlRepository.find({ key: input.key })
  }
}
