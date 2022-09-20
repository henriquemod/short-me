import request from 'supertest'
import { DbHelper } from '../../infra/@shared/helpers/db-helper'
import app from '../../main/config/app'

describe('Url Routes', () => {
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

  afterAll((done) => {
    done()
  })

  it('Should return 200 on success', async () => {
    await request(app)
      .post('/api/url')
      .send({
        url: 'https://google.com.br'
      })
      .expect(200)
  })

  it('Should return a bad request error on missing url', async () => {
    await request(app).post('/api/url').send({}).expect(400)
  })
})
