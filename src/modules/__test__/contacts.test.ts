import nock from 'nock'
import Contacts from '../contacts'
import { Readable } from 'stream'
import { ApiOptions, Contact } from '../../models'
import { contacts as response } from './__static__/contacts'

const opts: ApiOptions = {
  url: 'http://127.0.0.1',
  port: 40600
}

const ROOT = `${opts.url}:${opts.port}`
const contacts = new Contacts(opts)

describe('contacts add', () => {
  it('should resolve to boolean', async () => {
    nock(ROOT)
      .put('/api/v0/contacts/address', (body: Contact) => {
        return body.address === response.contact.address
      })
      .reply(204)

    expect(await contacts.add('address', response.contact)).toEqual(true)
  })
})

describe('contacts get', () => {
  it('should resolve to a valid contact object', async () => {
    nock(ROOT)
      .get('/api/v0/contacts/address')
      .reply(200, response.contact)

    expect(await contacts.get('address')).toEqual(response.contact)
  })
})

describe('contacts list', () => {
  it('should resolve to array of contacts', async () => {
    nock(ROOT)
      .get('/api/v0/contacts')
      .reply(200, { items: [response.contact] })

    expect(await contacts.list()).toEqual({ items: [response.contact] })
  })
})

describe('contacts remove', () => {
  it('should resolve to boolean', async () => {
    nock(ROOT)
      .delete('/api/v0/contacts/address')
      .reply(204)

    expect(await contacts.remove('address')).toEqual(true)
  })
})
