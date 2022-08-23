import { CreateUserRepository } from '../../../../src/data/protocols/user/create-user-repository'
import { DeleteUserRepository } from '../../../../src/data/protocols/user/delete-user-repository'
import { FindAllUsersRepository } from '../../../../src/data/protocols/user/find-all-users-repository'
import { FindUserRepository } from '../../../../src/data/protocols/user/find-user-repository'
import { UpdateUserRepository } from '../../../../src/data/protocols/user/update-user-repository'
import { DbCreateUser } from '../../../../src/data/usecases/user/db-create-user'
import { DbDeleteUser } from '../../../../src/data/usecases/user/db-delete-user'
import { DbFindAllUsers } from '../../../../src/data/usecases/user/db-find-all-users'
import { DbFindUser } from '../../../../src/data/usecases/user/db-find-user'
import { DbUpdateUser } from '../../../../src/data/usecases/user/db-update-user'
import {
  OutputCreateUserDto,
  OutputFindUserDto,
  InputCreateUserDto,
  InputUpdateUserDto,
  InputFindUserDto,
  InputDeleteUserDto,
  OutputDeleteUserDto,
  OutputFindAllUsersDto,
  OutputUpdateUserDto,
  InputUpdatePasswordDto
} from '../../../../src/domain/usecase/user'
import { Encrypter } from '../../../../src/presentation/protocols'

interface CreateSutTypes {
  sut: DbCreateUser
  createUserRepositorySut: CreateUserRepository
  encrypterStub: Encrypter
}

interface FindSutTypes {
  sut: DbFindUser
  findUserRepositorySut: FindUserRepository
}

interface FindAllSutTypes {
  sut: DbFindAllUsers
  findAllUsersRepositorySut: FindAllUsersRepository
}

interface DeleteSutTypes {
  sut: DbDeleteUser
  deleteUserRepositorySut: DeleteUserRepository
}

interface UpdateSutTypes {
  sut: DbUpdateUser
  updateUserRepositoryStub: UpdateUserRepository
}

interface FakeUserProps {
  id?: string
  username?: string
  password?: string
}

const makeFakeUserResponse = (props?: FakeUserProps): OutputCreateUserDto => ({
  id: 'valid_id',
  username: 'valid_name',
  password: 'hashed_password',
  ...props
})

const makeFakeFindUserResponse = (
  props?: FakeUserProps
): OutputFindUserDto => ({
  id: 'valid_id',
  username: 'valid_name',
  password: 'hashed_password',
  ...props
})

const makeFakeUserRequest = (props?: FakeUserProps): InputCreateUserDto => ({
  username: 'valid_name',
  password: 'hashed_password',
  ...props
})

const makeFakeUpdateUserRequest = (
  props?: FakeUserProps
): InputUpdateUserDto => ({
  id: 'valid_id',
  username: 'valid_name',
  password: 'hashed_password',
  ...props
})

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(_value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }

    async compare(_value: string, _hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }

  return new EncrypterStub()
}

const makeCreateUserRepository = (): CreateUserRepository => {
  class CreateUserRepositoryStub implements CreateUserRepository {
    async create(userData: InputCreateUserDto): Promise<OutputCreateUserDto> {
      const fakeUser = {
        username: userData.username,
        password: userData.password
      }

      return await new Promise((resolve) =>
        resolve(makeFakeUserResponse(fakeUser))
      )
    }
  }

  return new CreateUserRepositoryStub()
}

const makeFakeDeleteUserRepository = (): DeleteUserRepository => {
  class DeleteUserRepositoryStub implements DeleteUserRepository {
    async delete(_input: InputDeleteUserDto): Promise<OutputDeleteUserDto> {
      return await new Promise((resolve) => resolve({ deleted: true }))
    }
  }

  return new DeleteUserRepositoryStub()
}

const makeFindUserRepository = (): FindUserRepository => {
  class FindUserRepositoryStub implements FindUserRepository {
    async find(_input: InputFindUserDto): Promise<OutputFindUserDto> {
      return await new Promise((resolve) =>
        resolve(Object.assign(makeFakeUserResponse()))
      )
    }
  }

  return new FindUserRepositoryStub()
}

const makeFindAllUsersRepository = (): FindAllUsersRepository => {
  class FindAllUsersRepositoryStub implements FindAllUsersRepository {
    async findAll(): Promise<OutputFindAllUsersDto> {
      return await new Promise((resolve) =>
        resolve({ users: [makeFakeUserResponse()] })
      )
    }
  }

  return new FindAllUsersRepositoryStub()
}

const makeUpdateUserRepository = (): UpdateUserRepository => {
  class UpdateUserRepositoryStub implements UpdateUserRepository {
    async update(_input: InputUpdateUserDto): Promise<OutputUpdateUserDto> {
      return await new Promise((resolve) => resolve(makeFakeUserResponse()))
    }

    async updatePassword(
      _input: InputUpdatePasswordDto
    ): Promise<OutputUpdateUserDto> {
      return await new Promise((resolve) => resolve(makeFakeUserResponse()))
    }
  }

  return new UpdateUserRepositoryStub()
}

const makeCreateSut = (): CreateSutTypes => {
  const createUserRepositorySut = makeCreateUserRepository()
  const encrypterStub = makeEncrypter()
  const sut = new DbCreateUser(createUserRepositorySut, encrypterStub)
  return {
    sut,
    createUserRepositorySut,
    encrypterStub
  }
}

const makeFindSut = (): FindSutTypes => {
  const findUserRepositorySut = makeFindUserRepository()
  const sut = new DbFindUser(findUserRepositorySut)
  return {
    sut,
    findUserRepositorySut
  }
}

const makeFindAllSut = (): FindAllSutTypes => {
  const findAllUsersRepositorySut = makeFindAllUsersRepository()
  const sut = new DbFindAllUsers(findAllUsersRepositorySut)
  return {
    sut,
    findAllUsersRepositorySut
  }
}

const makeUpdateSut = (): UpdateSutTypes => {
  const updateUserRepositoryStub = makeUpdateUserRepository()
  const sut = new DbUpdateUser(updateUserRepositoryStub)
  return {
    sut,
    updateUserRepositoryStub
  }
}

const makeDeleteSut = (): DeleteSutTypes => {
  const deleteUserRepositorySut = makeFakeDeleteUserRepository()
  const sut = new DbDeleteUser(deleteUserRepositorySut)
  return {
    sut,
    deleteUserRepositorySut
  }
}

describe('User repository test', () => {
  // NOTE - CREATE TESTS
  it('should call CreateServerRepository with correct values', async () => {
    const { sut, createUserRepositorySut } = makeCreateSut()
    const createSpy = jest.spyOn(createUserRepositorySut, 'create')
    const userData = makeFakeUserRequest()

    await sut.create(userData)
    expect(createSpy).toHaveBeenCalledWith(userData)
  })

  it('should throw if CreateUserRepository throws', async () => {
    const { sut, createUserRepositorySut } = makeCreateSut()
    jest.spyOn(createUserRepositorySut, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const userData = makeFakeUserRequest()

    const promise = sut.create(userData)
    await expect(promise).rejects.toThrow()
  })

  it('should return an user if CreateUserRepository returns an user', async () => {
    const { sut } = makeCreateSut()
    const userData = makeFakeUserRequest()

    const user = await sut.create(userData)
    expect(user).toEqual(makeFakeUserResponse())
  })

  // NOTE - UPDATE TESTS
  it('should return 200 if updates user', async () => {
    const { sut } = makeUpdateSut()

    const userData = makeFakeUpdateUserRequest()

    const response = await sut.update({ ...userData })
    expect(response).toEqual(makeFakeUserResponse())
  })
  it('should call UpdateUserRepository with correct values', async () => {
    const { sut, updateUserRepositoryStub } = makeUpdateSut()
    const updateSpy = jest.spyOn(updateUserRepositoryStub, 'update')
    const userData = makeFakeUpdateUserRequest()

    await sut.update({ ...userData })
    expect(updateSpy).toHaveBeenCalledWith(userData)
  })

  it('should throw if UpdateUserRepository throws', async () => {
    const { sut, updateUserRepositoryStub } = makeUpdateSut()
    jest
      .spyOn(updateUserRepositoryStub, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const userData = makeFakeUpdateUserRequest()

    const promise = sut.update({ ...userData })
    await expect(promise).rejects.toThrow()
  })

  it('should return true if update password with correct current password', async () => {
    const { sut } = makeUpdateSut()

    const response = await sut.updatePassword({
      id: 'valid_id',
      currentPassword: 'valid_password',
      newPassword: 'new_valid_password'
    })
    expect(response).toEqual({
      id: 'valid_id',
      password: 'hashed_password',
      username: 'valid_name'
    })
  })

  // it('should throw if wrong password', async () => {
  //   const { sut, updateUserRepositoryStub } = makeUpdateSut()
  //   jest
  //     .spyOn(updateUserRepositoryStub, 'updatePassword')
  //     .mockImplementationOnce(() => {
  //       throw new Error('Invalid password')
  //     })

  //   const update = await sut.updatePassword({
  //     id: 'valid_id',
  //     currentPassword: 'invalid_password',
  //     newPassword: 'new_valid_password'
  //   })

  //   expect(update).toEqual('Invalid password')
  // })
  // NOTE - DELETE TESTS
  it('should call delete with correct values', async () => {
    const { sut, deleteUserRepositorySut } = makeDeleteSut()
    const deleteSpy = jest.spyOn(deleteUserRepositorySut, 'delete')

    await sut.delete({ id: 'valid_id' })
    expect(deleteSpy).toBeCalledWith({ id: 'valid_id' })
  })

  it('should delete user', async () => {
    const { sut, deleteUserRepositorySut } = makeDeleteSut()
    const deleteSpy = jest.spyOn(deleteUserRepositorySut, 'delete')

    await sut.delete({ id: 'valid_id' })
    expect(deleteSpy).toBeCalled()
  })

  it('should throw if delete throws', async () => {
    const { sut, deleteUserRepositorySut } = makeDeleteSut()
    jest.spyOn(deleteUserRepositorySut, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.delete({ id: 'valid_id' })
    await expect(promise).rejects.toThrow()
  })

  // NOTE - FIND TESTS
  it('it should find user', async () => {
    const { sut, findUserRepositorySut } = makeFindSut()
    jest
      .spyOn(findUserRepositorySut, 'find')
      .mockResolvedValue(makeFakeFindUserResponse())

    const find = await sut.find({ id: 'valid_id' })

    expect(find).toEqual(makeFakeUserResponse())
  })

  it('should call find with correct values', async () => {
    const { sut, findUserRepositorySut } = makeFindSut()
    const findSpy = jest.spyOn(findUserRepositorySut, 'find')

    await sut.find({ id: 'valid_id' })
    expect(findSpy).toBeCalledWith({ id: 'valid_id' })
  })

  it('should throw if find throws', async () => {
    const { sut, findUserRepositorySut } = makeFindSut()
    jest.spyOn(findUserRepositorySut, 'find').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.find({ id: 'valid_id' })
    await expect(promise).rejects.toThrow()
  })

  // NOTE - FIND ALL TESTS
  it('should find all users', async () => {
    const { sut, findAllUsersRepositorySut } = makeFindAllSut()
    jest
      .spyOn(findAllUsersRepositorySut, 'findAll')
      .mockResolvedValue({ users: [makeFakeUserResponse()] })

    const findAll = await sut.findAll()

    expect(findAll).toEqual({ users: [makeFakeUserResponse()] })
  })

  it('should return empty array if no users are found', async () => {
    const { sut, findAllUsersRepositorySut } = makeFindAllSut()
    jest.spyOn(findAllUsersRepositorySut, 'findAll').mockResolvedValue({
      users: []
    })

    const findAll = await sut.findAll()

    expect(findAll).toEqual({ users: [] })
  })

  it('should throw if findAll throws', async () => {
    const { sut, findAllUsersRepositorySut } = makeFindAllSut()
    jest
      .spyOn(findAllUsersRepositorySut, 'findAll')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.findAll()
    await expect(promise).rejects.toThrow()
  })
})
