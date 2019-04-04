import nock from 'nock'
import Cafes from '../cafes'
import { ApiOptions } from '../../models'
import { cafes as response } from './__static__/responses'

const opts: ApiOptions = {
  url: 'http://127.0.0.1',
  port: 40600
}

const ROOT = `${opts.url}:${opts.port}`
const cafes = new Cafes(opts)

describe('cafes add', () => {
  it('should resolve to valid cafe session', async () => {
    nock(ROOT)
      .post('/api/v0/cafes')
      .reply(201, response.add)

    expect(await cafes.add('http://fake.cafe', 'token')).toEqual(response.add)
  })
})

describe('cafes get', () => {
  it('should resolve to valid safe session', async () => {
    nock(ROOT)
      .get('/api/v0/cafes/id')
      .reply(200, response.add)

    expect(await cafes.get('id')).toEqual(response.add)
  })
})

describe('cafes list', () => {
  it('should respond with plain text account seed', async () => {
    nock(ROOT)
      .get('/api/v0/cafes')
      .reply(200, { items: [response.add] })

    expect(await cafes.list()).toEqual({ items: [ response.add ] })
  })
})

describe('cafes checkMessages', () => {
  it('should resolve to boolean', async () => {
    nock(ROOT)
      .post('/api/v0/cafes/messages')
      .reply(200, 'ok')

    expect(await cafes.checkMessages()).toEqual(true)
  })
})

describe('cafes remove', () => {
  it('should resolve to boolean', async () => {
    nock(ROOT)
      .delete('/api/v0/cafes/id')
      .reply(204, 'ok')

    expect(await cafes.remove('id')).toEqual(true)
  })
})
