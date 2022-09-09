import {
  InputDeleteUrlDto,
  OutputDeleteUrlDto
} from '../../../domain/usecase/url'

export interface DeleteUrlRepository {
  delete: (input: InputDeleteUrlDto) => Promise<OutputDeleteUrlDto>
}
