import nock from 'nock'
import Tokens from '../tokens'
import { ApiOptions } from '../../models'

const token = 'RgUbEwnaifcr6WoM2ZfnnGr9dAf1QtWhdWVChzd6ui55To52F1DRkGsRni4H'

const opts: ApiOptions = {
  url: 'http://127.0.0.1',
  port: 40600,
  version: 0
}

const ROOT = `${opts.url}:${opts.port}`
const tokens = new Tokens(opts)

describe('tokens create', () => {
  it('should resolve to a new valid cafe token', async () => {
    nock(ROOT)
      .post('/api/v0/tokens')
      .reply(201, token)

    expect(await tokens.add()).toEqual(token)
  })
})

describe('tokens list', () => {
  it('should resolve to a list of token hashes', async () => {
    nock(ROOT)
      .get('/api/v0/tokens')
      .reply(200, [token])

    expect(await tokens.list()).toEqual([token])
  })
})

describe('tokens validate', () => {
  it('should resolve to boolean (true) on valid token', async () => {
    nock(ROOT)
      .get(`/api/v0/tokens/${token}`)
      .reply(200)

    expect(await tokens.validate(token)).toEqual(true)
  })
})

describe('tokens remove', () => {
  it('should resolve to boolean (true) on successfull removal', async () => {
    nock(ROOT)
      .delete(`/api/v0/tokens/${token}`)
      .reply(204)

    expect(await tokens.remove(token)).toEqual(true)
  })
})
