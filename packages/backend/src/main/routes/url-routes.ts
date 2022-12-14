/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import {
  makeDeleteUrlController,
  makeFindAllUrlsController,
  makeFindUrlController,
  makeUrlController
} from '../factories/url'
export default (router: Router): void => {
  router.post('/url', adaptRoute(makeUrlController()))
  router.delete('/url', adaptRoute(makeDeleteUrlController()))
  router.get('/url/:key', adaptRoute(makeFindUrlController()))
  router.get('/url', adaptRoute(makeFindAllUrlsController()))
}
