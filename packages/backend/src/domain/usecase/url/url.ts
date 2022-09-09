import {
  InputCreateUrlDto,
  OutputCreateUrlDto,
  InputFindUrlDto,
  OutputFindUrlDto,
  InputDeleteUrlDto,
  OutputDeleteUrlDto
} from '.'

export interface CreateUrl {
  create: (input: InputCreateUrlDto) => Promise<OutputCreateUrlDto>
}

export interface FindUrl {
  find: (input: InputFindUrlDto) => Promise<OutputFindUrlDto | undefined>
}

export interface DeleteUrl {
  delete: (input: InputDeleteUrlDto) => Promise<OutputDeleteUrlDto>
}
