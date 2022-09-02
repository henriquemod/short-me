import {
  InputCreateUrlDto,
  OutputCreateUrlDto,
  InputFindUrlDto,
  OutputFindUrlDto
} from '.'

export interface CreateUrl {
  create: (input: InputCreateUrlDto) => Promise<OutputCreateUrlDto>
}

export interface FindUrl {
  find: (input: InputFindUrlDto) => Promise<OutputFindUrlDto>
}
