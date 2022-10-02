import { OutputFindUrlDto } from '../../../domain/usecase/url'
import { FindUrl } from '../../../domain/usecase/url/url'
import { MissingParamError } from '../../error'
import {
  badRequest,
  notFoundRequest,
  ok,
  serverError
} from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { ExceptionHandler } from '../../protocols/exception-handler'

export default class FindUrlController implements Controller {
  constructor(
    private readonly findUrl: FindUrl,
    private readonly exceptionHandler: ExceptionHandler
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['key']
      for (const field of requiredFields) {
        if (!httpRequest.params[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { key } = httpRequest.params

      const url = await this.findUrl.find({ key })

      if (!url) {
        return notFoundRequest(new Error('Entity not found'))
      }

      const urlDto: OutputFindUrlDto = {
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
