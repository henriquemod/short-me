import { OutputDeleteUrlDto } from '../../../domain/usecase/url'
import { DeleteUrl } from '../../../domain/usecase/url/url'
import { MissingParamError } from '../../error'
import {
  badRequest,
  notFoundRequest,
  ok,
  serverError
} from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { ExceptionHandler } from '../../protocols/exception-handler'

export default class DeleteUrlController implements Controller {
  constructor(
    private readonly DeleteUrl: DeleteUrl,
    private readonly exceptionHandler: ExceptionHandler
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['id']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { id } = httpRequest.body

      const url = await this.DeleteUrl.delete({ id })

      if (!url) {
        return notFoundRequest(new Error('Not found'))
      }

      const urlDto: OutputDeleteUrlDto = {
        id: url.id,
        url: url.url,
        key: url.key
      }

      return ok(urlDto)
    } catch (error) {
      this.exceptionHandler.validate(error as Error)
      return serverError(error as Error)
    }
  }
}
