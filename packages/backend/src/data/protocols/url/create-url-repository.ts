import {
  InputCreateUrlDto,
  OutputCreateUrlDto
} from '../../../domain/usecase/url'

export interface CreateUrlRepository {
  create: (userData: InputCreateUrlDto) => Promise<OutputCreateUrlDto>
}
