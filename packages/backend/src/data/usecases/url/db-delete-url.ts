import {
  InputDeleteUrlDto,
  OutputDeleteUrlDto
} from '../../../domain/usecase/url'
import { DeleteUrl } from '../../../domain/usecase/url/url'

export class DbDeleteUrl implements DeleteUrl {
  constructor(private readonly deleteUrlRepository: DeleteUrl) {}

  async delete({ id }: InputDeleteUrlDto): Promise<OutputDeleteUrlDto> {
    return await this.deleteUrlRepository.delete({ id })
  }
}
