import nock from 'nock'
import Messages from '../messages'
import { ApiOptions } from '../../models'
import { messages as response, ignore } from './__static__/responses'

const opts: ApiOptions = {
  url: 'http://127.0.0.1',
  port: '40600'
}

const ROOT = `${opts.url}:${opts.port}`
const messages = new Messages(opts)

describe('messages add', () => {
  it('should resolve to block update', async () => {
    nock(ROOT)
      .post('/api/v0/threads/thread/messages')
      .reply(201, response.add)

    expect(await messages.add('thread', 'body')).toEqual(response.add)
  })
})

describe('messages get', () => {
  it('should resolve to block update', async () => {
    nock(ROOT)
      .get('/api/v0/messages/id')
      .reply(200, response.add)

    expect(await messages.get('id')).toEqual(response.add)
  })
})

describe('messages list', () => {
  it('should resolve to array of block updates', async () => {
    nock(ROOT)
      .get('/api/v0/messages')
      .reply(200, response.list)
    expect(await messages.list()).toEqual(response.list)
  })
})

describe('messages ignore', () => {
  it('should resolve to ignore block', async () => {
    nock(ROOT)
      .delete('/api/v0/blocks/id')
      .reply(201, ignore)

    expect(await messages.ignore('id')).toEqual(ignore)
  })
})
