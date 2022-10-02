import { OutputFindAllUrlsDto } from '../../../domain/usecase/url'
import { FindAllUrls } from '../../../domain/usecase/url/url'
import { ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { ExceptionHandler } from '../../protocols/exception-handler'

export default class FindAllUrlsController implements Controller {
  constructor(
    private readonly findAllUrls: FindAllUrls,
    private readonly exceptionHandler: ExceptionHandler
  ) {}

  async handle(_: HttpRequest): Promise<HttpResponse> {
    try {
      const urls = await this.findAllUrls.findAll()

      const urlDto: OutputFindAllUrlsDto = {
        urls
      }

      return ok(urlDto)
    } catch (error) {
      this.exceptionHandler.validate(error as Error)
      return serverError(error as Error)
    }
  }
}
