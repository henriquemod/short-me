import argon2 from 'argon2'
import { DataSource } from 'typeorm'
import userModel from '../../../src/infra/user/model/user-model'
import UserRepository from '../../../src/infra/user/repository/user-repository'
import { Encrypter } from '../../../src/presentation/protocols'

interface SutTypes {
  sut: UserRepository
  encrypterStub: Encrypter
}

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return await new Promise((resolve) => resolve('hashed_password'))
    }

    async compare(value: string, hash: string): Promise<boolean> {
      return await new Promise((resolve) => resolve(true))
    }
  }

  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const sut = new UserRepository(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

describe('Server repository test', () => {
  let datasource: DataSource

  beforeEach(async () => {
    datasource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [userModel],
      migrations: [],
      subscribers: []
    })

    await datasource.initialize()
  })

  afterEach(async () => {
    try {
      await datasource.destroy()
    } catch (error) {
      console.log('Error destroying datasource: ', error)
    }
  })

  it('should create a user', async () => {
    const { sut } = makeSut()
    const userPassword = '123456'
    const user = await sut.create({
      username: 'John Doe',
      password: userPassword
    })

    const foundUser = await sut.find({ id: user.id })

    expect(foundUser).toBeDefined()
    if (foundUser) {
      expect(foundUser.username).toBe(user.username)
    }
  })

  it('should update a user', async () => {
    const { sut } = makeSut()

    const user = await sut.create({
      username: 'John Doe',
      password: '123456'
    })

    const foundUser = await sut.find({ id: user.id })

    expect(foundUser).toBeDefined()
    expect(foundUser?.username).toBe('John Doe')

    await sut.update({
      id: user.id,
      username: 'John Updated'
    })

    const updatedUser = await sut.find({ id: user.id })

    expect(updatedUser).toBeDefined()
    expect(updatedUser?.username).toBe('John Updated')
  })

  it('should delete a user', async () => {
    const { sut } = makeSut()

    const user = await sut.create({
      username: 'John Doe',
      password: '123456'
    })

    const foundUser = await sut.find({ id: user.id })

    expect(foundUser).toMatchObject({
      id: user.id,
      username: 'John Doe'
    })

    const remove = await sut.delete({ id: user.id })

    expect(remove.deleted).toBe(true)
  })

  it('should return false when deleting a user with invalid id', async () => {
    const { sut } = makeSut()

    const user = await sut.create({
      username: 'John Doe',
      password: '123456'
    })

    const foundUser = await sut.find({ id: user.id })

    expect(foundUser).toMatchObject({
      id: user.id,
      username: 'John Doe'
    })

    const remove = await sut.delete({ id: 'invalid_id' })

    expect(remove.deleted).toBe(false)
  })

  it('should find a user', async () => {
    const { sut } = makeSut()

    const user = await sut.create({
      username: 'John Doe',
      password: '123456'
    })

    const foundUser = await sut.find({ id: user.id })

    expect(foundUser).toMatchObject({
      id: user.id,
      username: 'John Doe'
    })
  })

  it('should find all users', async () => {
    const { sut } = makeSut()
    await sut.create({
      username: 'User1',
      password: '123456'
    })

    await sut.create({
      username: 'User2',
      password: '123456'
    })

    const result = await sut.findAll()

    expect(result.users).toHaveLength(2)
  })

  it('should update password', async () => {
    const { sut } = makeSut()

    const user = await sut.create({
      username: 'John Doe',
      password: '123456'
    })

    const foundUser = await sut.find({ id: user.id })

    expect(foundUser).toBeDefined()

    await sut.updatePassword({
      id: user.id,
      currentPassword: '123456',
      newPassword: 'abcdefgh'
    })

    const foundUpdatedUser = await sut.find({ id: user.id })
    expect(foundUpdatedUser).toBeDefined()

    const validatePassword = argon2.verify(
      foundUpdatedUser?.password ?? '',
      'abcdefgh'
    )
    expect(validatePassword).toBeTruthy()
  })

  it('should throw error if try yo update a user with an invalid id', async () => {
    const { sut } = makeSut()
    const user = await sut.create({
      username: 'valid name',
      password: 'valid_password'
    })

    expect(user).toBeTruthy()

    await expect(
      sut.update({
        id: 'invalid_id',
        username: 'valid name'
      })
    ).rejects.toThrow(new Error("User doesn't exist"))
  })

  it('should throw error if try yo find a updated user', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'find').mockResolvedValueOnce(undefined)

    const user = await sut.create({
      username: 'valid name',
      password: 'valid_password'
    })

    expect(user).toBeTruthy()

    await expect(
      sut.update({
        id: user.id,
        username: 'valid name'
      })
    ).rejects.toThrow(new Error("User doesn't exist"))
  })

  it('should throw error if try yo update a user password with an invalid id', async () => {
    const { sut } = makeSut()
    const user = await sut.create({
      username: 'valid name',
      password: 'valid_password'
    })

    expect(user).toBeTruthy()

    await expect(
      sut.updatePassword({
        id: 'invalid_id',
        currentPassword: 'valid_password',
        newPassword: 'abcdefgh'
      })
    ).rejects.toThrow(new Error("User doesn't exist"))
  })

  it('should throw error if try yo find a user with updated password', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'find').mockResolvedValueOnce(undefined)

    const user = await sut.create({
      username: 'valid name',
      password: 'valid_password'
    })

    expect(user).toBeTruthy()

    await expect(
      sut.updatePassword({
        id: user.id,
        currentPassword: 'valid_password',
        newPassword: 'abcdefgh'
      })
    ).rejects.toThrow(new Error("User doesn't exist"))
  })

  it('should throw error if try yo update a user password with wrong current password', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'compare').mockResolvedValueOnce(false)

    const user = await sut.create({
      username: 'valid name',
      password: 'valid_password'
    })

    expect(user).toBeTruthy()

    await expect(
      sut.updatePassword({
        id: user.id,
        currentPassword: 'valid_password',
        newPassword: 'abcdefgh'
      })
    ).rejects.toThrow(new Error('Invalid password'))
  })
})
