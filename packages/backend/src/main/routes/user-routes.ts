/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import {
  //   makeDeleteUserController,
  //   makeFindAllUsersController,
  //   makeFindUserController,
  //   makeUpdateUserController,
  makeUserController
} from '../factories/user'
export default (router: Router): void => {
  router.post('/user', adaptRoute(makeUserController()))
  //   router.put('/user', adaptRoute(makeUpdateUserController()))
  //   router.delete('/user', adaptRoute(makeDeleteUserController()))
  //   router.get('/user/:id', adaptRoute(makeFindUserController()))
  //   router.get('/users', adaptRoute(makeFindAllUsersController()))
}
