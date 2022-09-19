import { captureException } from '@sentry/node'
import { OutputCreateUrlDto } from '../../../domain/usecase/url'
import { CreateUrl } from '../../../domain/usecase/url/url'
import { MissingParamError } from '../../error'
import { InvalidParamError } from '../../error/invalid-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { UrlValidator } from '../../protocols/url-validator'

export default class CreateUrlController implements Controller {
  constructor(
    private readonly createUrl: CreateUrl,
    private readonly urlValidator: UrlValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['url']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { url: inputUrl } = httpRequest.body

      const error = this.urlValidator.validate(inputUrl)

      if (!error) {
        return badRequest(new InvalidParamError('url'))
      }

      const { id, url, key } = await this.createUrl.create({ url: inputUrl })

      const urlDto: OutputCreateUrlDto = {
        id,
        url,
        key
      }

      return ok(urlDto)
    } catch (error) {
      captureException(error)
      return serverError(error as Error)
    }
  }
}
