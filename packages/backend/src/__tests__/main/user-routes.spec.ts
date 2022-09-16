/* eslint-disable @typescript-eslint/restrict-template-expressions */
import request from 'supertest'
import { DbHelper } from '../../infra/@shared/helpers/db-helper'
import app from '../../main/config/app'
describe('User Routes', () => {
  beforeEach(async () => {
    await DbHelper.connect()
  })

  afterEach(async () => {
    try {
      await DbHelper.disconnect()
    } catch (error) {
      console.log('Error destroying datasource: ', error)
    }
  })
  // it('Should return a user on success', async () => {
  //   await request(app)
  //     .post('/api/user')
  //     .send({
  //       username: 'username',
  //       password: '123123',
  //       passwordConfirmation: '123123'
  //     })
  //     .expect(200)
  // })

  it('Should return a bad request error on missing name', async () => {
    await request(app)
      .post('/api/user')
      .send({
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(400)
  })

  it('Should return a bad request error on missing password', async () => {
    await request(app)
      .post('/api/user')
      .send({
        name: 'UserName',
        passwordConfirmation: '123'
      })
      .expect(400)
  })

  it('Should return a bad request error on missing password confirmation', async () => {
    await request(app)
      .post('/api/user')
      .send({
        name: 'UserName',
        password: '123'
      })
      .expect(400)
  })

  it('Should return a bad request if password doesnt match with password confirmation', async () => {
    await request(app)
      .post('/api/user')
      .send({
        username: 'UserName',
        password: '123',
        passwordConfirmation: '321'
      })
      .expect(400)
  })
})
