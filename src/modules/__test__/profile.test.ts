import nock from 'nock'
import Profile from '../profile'
import { ApiOptions } from '../../models'
import { profile as response } from './__static__/responses'

const opts: ApiOptions = {
  url: 'http://127.0.0.1',
  port: 40600,
  version: 0
}

const ROOT = `${opts.url}:${opts.port}`
const profile = new Profile(opts)

describe('profile set name', () => {
  it('should resolve to boolean', async () => {
    nock(ROOT)
      .post('/api/v0/profile/name')
      .reply(201)

    expect(await profile.setName('displayname')).toEqual(true)
  })
})

describe('profile get name', () => {
  it('should resolve to name string', async () => {
    nock(ROOT)
      .get('/api/v0/profile')
      .reply(200, response.get)

    expect(await profile.name()).toEqual('displayname')
  })
})

describe('profile set avatar', () => {
  it('should resolve to boolean', async () => {
    nock(ROOT)
      .post('/api/v0/profile/avatar')
      .reply(201)

    expect(await profile.setAvatar(response.get.avatar)).toEqual(true)
  })
})

describe('profile get avatar', () => {
  it('should resolve to avatar hash string', async () => {
    nock(ROOT)
      .get('/api/v0/profile')
      .reply(200, response.get)

    expect(await profile.avatar()).toEqual(response.get.avatar)
  })
})

describe('profile get', () => {
  it('should resolve to full profile', async () => {
    nock(ROOT)
      .get('/api/v0/profile')
      .reply(200, response.get)

    expect(await profile.get()).toEqual(response.get)
  })
})
