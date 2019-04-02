import nock from 'nock'
import Utils from '../utils'
import { ApiOptions } from '../../models'
import { utils as response } from './__static__/responses'

const opts: ApiOptions = {
  url: 'http://127.0.0.1',
  port: '40600'
}

const ROOT = `${opts.url}:${opts.port}`
const utils = new Utils(opts)

describe('node version', () => {
  it('should resolve to latest go-textile version', async () => {
    const versionString = 'go-textile version v0.0.0'
    nock(ROOT)
      .get('/')
      .reply(200, versionString)

    expect(await utils.version()).toEqual(versionString)
  })
})

describe('node summary', () => {
  it('should resolve a full node summary object', async () => {
    nock(ROOT)
      .get('/api/v0/summary')
      .reply(200, response.summary)

    expect(await utils.nodeSummary()).toEqual(response.summary)
  })
})

describe('node online', () => {
  it('should resolve to a boolean (true)', async () => {
    nock(ROOT)
      .get('/health')
      .reply(204)

    expect(await utils.online()).toEqual(true)
  })
})
