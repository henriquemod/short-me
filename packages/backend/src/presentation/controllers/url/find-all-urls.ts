import { captureException } from '@sentry/node'
import { OutputFindAllUrlsDto } from '../../../domain/usecase/url'
import { FindAllUrls } from '../../../domain/usecase/url/url'
import { ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export default class FindAllUrlsController implements Controller {
  constructor(private readonly findAllUrls: FindAllUrls) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const urls = await this.findAllUrls.findAll()

      const urlDto: OutputFindAllUrlsDto = {
        urls
      }

      return ok(urlDto)
    } catch (error) {
      if (process.env.NODE_ENV !== 'development') {
        captureException(error)
      }
      return serverError(error as Error)
    }
  }
}
