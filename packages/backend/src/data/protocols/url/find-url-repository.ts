import { InputFindUrlDto, OutputFindUrlDto } from '../../../domain/usecase/url'

export interface FindUrlRepository {
  find: (input: InputFindUrlDto) => Promise<OutputFindUrlDto>
}
