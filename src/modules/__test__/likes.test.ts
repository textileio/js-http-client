import nock from 'nock'
import Likes from '../likes'
import { ApiOptions } from '../../models'
import { likes as response, ignore } from './__static__/responses'

const opts: ApiOptions = {
  url: 'http://127.0.0.1',
  port: 40600,
  version: 0
}

const ROOT = `${opts.url}:${opts.port}`
const likes = new Likes(opts)

describe('likes add', () => {
  it('should resolve to block update', async () => {
    nock(ROOT)
      .post('/api/v0/blocks/id/likes')
      .reply(201, response.add)

    expect(await likes.add('id')).toEqual(response.add)
  })
})

describe('likes get', () => {
  it('should resolve to block update', async () => {
    nock(ROOT)
      .get('/api/v0/blocks/id/like')
      .reply(200, response.add)

    expect(await likes.get('id')).toEqual(response.add)
  })
})

describe('likes list', () => {
  it('should resolve to array of block updates', async () => {
    nock(ROOT)
      .get('/api/v0/blocks/id/likes')
      .reply(200, { items: [response.add] })

    expect(await likes.list('id')).toEqual({ items: [response.add] })
  })
})

describe('likes ignore', () => {
  it('should resolve to ignore block', async () => {
    nock(ROOT)
      .delete('/api/v0/blocks/id')
      .reply(201, ignore)

    expect(await likes.ignore('id')).toEqual(ignore)
  })
})
