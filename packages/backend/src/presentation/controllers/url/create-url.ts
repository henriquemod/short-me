import { OutputCreateUrlDto } from '../../../domain/usecase/url'
import { CreateUrl } from '../../../domain/usecase/url/url'
import { MissingParamError } from '../../error'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export default class CreateUrlController implements Controller {
  constructor(private readonly createUrl: CreateUrl) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['url']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { url: inputUrl } = httpRequest.body

      const url = await this.createUrl.create({ url: inputUrl })

      const urlDto: OutputCreateUrlDto = {
        id: url.id,
        url: url.url,
        urlShort: url.urlShort
      }

      return ok(urlDto)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
