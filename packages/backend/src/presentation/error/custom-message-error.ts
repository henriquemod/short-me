export class CustomMessageError extends Error {
  constructor(paramName: string) {
    super(`${paramName}`)
    this.name = 'ServerMessageError'
  }
}
