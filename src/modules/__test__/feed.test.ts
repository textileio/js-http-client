import nock from 'nock'
import Feed from '../feed'
import { ApiOptions } from '../../models'
import { stacks, chrono } from './__static__/feed'

const opts: ApiOptions = {
  url: 'http://127.0.0.1',
  port: 40600,
  version: 0
}

const ROOT = `${opts.url}:${opts.port}`
const feed = new Feed(opts)

describe('feed get stacked', () => {
  it('should resolve to a feed list object as stacks of items', async () => {
    nock(ROOT)
      .get('/api/v0/feed')
      .reply(200, stacks)

    expect(await feed.list(undefined, undefined, 5, 'stacks')).toEqual(stacks)
  })
})

describe('feed get chrono (default)', () => {
  it('should resolve to a feed list object in chronological order', async () => {
    nock(ROOT)
      .get('/api/v0/feed')
      .reply(200, chrono)

    expect(await feed.list()).toEqual(chrono)
  })
})
