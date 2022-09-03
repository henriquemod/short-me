import {
  InputCreateUrlDto,
  InputFindUrlDto,
  OutputCreateUrlDto,
  OutputFindUrlDto
} from '../usecase/url'

export interface UrlRepositoryInterface {
  create: (input: InputCreateUrlDto) => Promise<OutputCreateUrlDto>
  find: (input: InputFindUrlDto) => Promise<OutputFindUrlDto | undefined>
}
