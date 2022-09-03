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

export default class FindUrlController implements Controller {
  constructor(private readonly findUrl: FindUrl) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['key']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { key } = httpRequest.body

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
      return serverError(error as Error)
    }
  }
}
