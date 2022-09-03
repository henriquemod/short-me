/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import {
  //   makeDeleteUserController,
  //   makeFindAllUsersController,
  makeFindUrlController,
  //   makeUpdateUserController,
  makeUrlController
} from '../factories/url'
export default (router: Router): void => {
  router.post('/url', adaptRoute(makeUrlController()))
  //   router.put('/user', adaptRoute(makeUpdateUserController()))
  //   router.delete('/user', adaptRoute(makeDeleteUserController()))
  router.get('/url/:key', adaptRoute(makeFindUrlController()))
  //   router.get('/users', adaptRoute(makeFindAllUsersController()))
}
