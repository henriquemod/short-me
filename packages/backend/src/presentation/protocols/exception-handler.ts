export interface ExceptionHandler {
  validate: (err: Error) => void
}
