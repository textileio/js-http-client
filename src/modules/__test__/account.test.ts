import nock from 'nock'
import Account from '../account'
import { ApiOptions } from '../../models'
import { account as response } from './__static__/responses'

const opts: ApiOptions = {
  url: 'http://127.0.0.1',
  port: 40600
}

const ROOT = `${opts.url}:${opts.port}`
const account = new Account(opts)

describe('account address', () => {
  it('should resolve to account address as string', async () => {
    nock(ROOT)
      .get('/api/v0/account/address')
      .reply(200, response.address)

    expect(await account.address()).toEqual(response.address)
  })
})

describe('account seed', () => {
  it('should resolve to account seed as string', async () => {
    nock(ROOT)
      .get('/api/v0/account/seed')
      .reply(200, response.seed)

    expect(await account.seed()).toEqual(response.seed)
  })
})

describe('account contact', () => {
  it('should resolve with local node contact info', async () => {
    nock(ROOT)
      .get('/api/v0/account')
      .reply(200, response.contact)

    expect(await account.contact()).toEqual(response.contact)
  })
})
