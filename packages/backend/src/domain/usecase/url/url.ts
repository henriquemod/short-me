import { InputCreateUrlDto, OutputCreateUrlDto } from '.'

export interface CreateUrl {
  create: (input: InputCreateUrlDto) => Promise<OutputCreateUrlDto>
}
