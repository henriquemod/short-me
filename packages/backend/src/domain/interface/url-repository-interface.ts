import {
  InputCreateUrlDto,
  InputFindUrlDto,
  OutputCreateUrlDto,
  OutputFindUrlDto,
  InputDeleteUrlDto,
  OutputDeleteUrlDto
} from '../usecase/url'

export interface UrlRepositoryInterface {
  create: (input: InputCreateUrlDto) => Promise<OutputCreateUrlDto>
  find: (input: InputFindUrlDto) => Promise<OutputFindUrlDto | undefined>
  findAll: () => Promise<OutputFindUrlDto[]>
  delete: (input: InputDeleteUrlDto) => Promise<OutputDeleteUrlDto | undefined>
}
