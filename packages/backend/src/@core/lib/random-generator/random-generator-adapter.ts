import { RandomGenerator } from '../../../presentation/protocols'

export class RandomGeneratorAdapter implements RandomGenerator {
  generate(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
  }
}
