import { captureException } from '@sentry/node'
import { OutputDeleteUrlDto } from '../../../domain/usecase/url'
import { DeleteUrl } from '../../../domain/usecase/url/url'
import { MissingParamError } from '../../error'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export default class DeleteUrlController implements Controller {
  constructor(private readonly DeleteUrl: DeleteUrl) {}

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

      const urlDto: OutputDeleteUrlDto = {
        id: url.id,
        url: url.url,
        key: url.key
      }

      return ok(urlDto)
    } catch (error) {
      captureException(error)
      return serverError(error as Error)
    }
  }
}
