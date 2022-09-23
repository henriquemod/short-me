import argon2d from 'argon2'
import { Encrypter } from '../../../presentation/protocols/encrypter'

export class EncrypterAdapter implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return argon2d.hash(value)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return argon2d.verify(hash, value)
  }
}
