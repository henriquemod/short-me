import argon2d from 'argon2'
import { Encrypter } from '../../../presentation/protocols/encrypter'

export class EncrypterAdapter implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return await argon2d.hash(value)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await argon2d.verify(hash, value)
  }
}
