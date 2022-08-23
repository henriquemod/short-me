import { OutputFindAllUsersDto } from '../../../domain/usecase/user'

export interface FindAllUsersRepository {
  findAll: () => Promise<OutputFindAllUsersDto>
}
