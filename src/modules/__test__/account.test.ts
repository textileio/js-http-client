import nock from 'nock'
import Account from '../account'
import { ApiOptions } from '../../models'
import responses from './__static__/account.json'

const opts: ApiOptions = {
  url: 'http://127.0.0.1',
  port: '40600'
}

const ROOT = `${opts.url}:${opts.port}`

const account = new Account(opts)

describe('account api peers', () => {
  it('should respond with object of peer items', async () => {
    nock(ROOT)
      .get('/api/v0/account/peers')
      .reply(200, responses.account.peers)

    expect(account.peers()).resolves.toEqual({ items: []})
  })
})

describe('account api address', () => {
  it('should respond with plain text address', async () => {
    nock(ROOT)
      .get('/api/v0/account/address')
      .reply(200, responses.account.address)

    expect(account.address()).resolves.toEqual('P9UcFifmikQr591RhgUShlAJd5Sxfcj3W8hrhwYG9oDTButN')
  })
})
