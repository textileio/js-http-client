import nock from 'nock'
import Config from '../config'
import { ApiOptions } from '../../models'
import { config as response } from './__static__/config'

const opts: ApiOptions = {
  url: 'http://127.0.0.1',
  port: 40600
}

const ROOT = `${opts.url}:${opts.port}`
const config = new Config(opts)

describe('config get', () => {
  it('should resolve to valid return value', async () => {
    nock(ROOT)
      .get('/api/v0/config/Addresses/API')
      .reply(200, ROOT)
    nock(ROOT)
      .get('/api/v0/config/Not/Valid')
      .replyWithError({
        message: 'empty struct value',
        code: 400
      })

    expect(await config.get('Addresses.API')).toEqual(ROOT)
  })
})

describe('config get whole thing', () => {
  it('should resolve to valid return value', async () => {
    nock(ROOT)
      .get('/api/v0/config')
      .reply(200, response)

    expect(await config.get()).toEqual(response)
  })
})

describe('config set', () => {
  it('should resolve to boolean', async () => {
    // const patch = [{ op: 'replace', path: 'IsServer', value: true }]
    // TODO: Specify patch body matching
    nock(ROOT)
      .patch('/api/v0/config')
      .reply(204)
    expect(await config.set('IsServer', true)).toEqual(true)
  })
})
