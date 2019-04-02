import nock from 'nock'
import Comments from '../comments'
import { ApiOptions } from '../../models'
import { comments as response, ignore } from './__static__/responses'

const opts: ApiOptions = {
  url: 'http://127.0.0.1',
  port: '40600'
}

const ROOT = `${opts.url}:${opts.port}`
const comments = new Comments(opts)

describe('comments add', () => {
  it('should resolve to block update', async () => {
    nock(ROOT)
      .post('/api/v0/blocks/id/comments')
      .reply(201, response.add)

    expect(await comments.add('id', 'comment')).toEqual(response.add)
  })
})

describe('comments get', () => {
  it('should resolve to block update', async () => {
    nock(ROOT)
      .get('/api/v0/blocks/id/comment')
      .reply(200, response.add)

    expect(await comments.get('id')).toEqual(response.add)
  })
})

describe('comments list', () => {
  it('should resolve to array of block updates', async () => {
    nock(ROOT)
      .get('/api/v0/blocks/id/comments')
      .reply(200, { items: [response.add] })

    expect(await comments.list('id')).toEqual({ items: [response.add] })
  })
})

describe('comments ignore', () => {
  it('should resolve to ignore block', async () => {
    nock(ROOT)
      .delete('/api/v0/blocks/id')
      .reply(201, ignore)

    expect(await comments.ignore('id')).toEqual(ignore)
  })
})
