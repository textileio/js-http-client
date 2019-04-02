import { EventEmitter2 } from 'eventemitter2'
import { API } from '../core/api'
import {
  ApiOptions, Contact, ContactList, RunningEvent, KeyValue,
  QueryOptions, QueryResult, Query, QueryResults
} from '../models'

/**
 * Contacts is an API module for managing local contacts and finding contacts on the network
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class Contacts extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }

  /**
   * Adds or updates a contact directly, usually from a search
   *
   * @param contact JSON object representing a contact
   * @returns Whether the operation was sucessfull
   */
  async add(address: string, contact: Contact) {
    const response = await this.sendPut(
      `/api/v0/contacts/${address}`,
      undefined,
      undefined,
      contact
    )
    return response.status === 204
  }

  /**
   * Retrieve information about a known contact
   *
   * @param address Address of the contact
   * @returns The associated contact object
   */
  async get(address: string) {
    const response = await this.sendGet(`/api/v0/contacts/${address}`)
    return response.data as Contact
  }

  /**
   * Retrieves a list of known contacts
   * @returns An array of all known contacts
   */
  async list() {
    const response = await this.sendGet('/api/v0/contacts')
    return response.data as ContactList
  }

  /**
   * Remove a known contact
   *
   * @param address Address of the contact
   * @returns Whether the operation was successfull
   */
  async remove(contactId: string) {
    const response = await this.sendDelete(`/api/v0/contacts/${contactId}`)
    return response.status === 204
  }

  /**
   * Searches locally and on the network for contacts by username, peer id, or address
   *
   * @param username Search by username string
   * @param address Search by account address string
   * @param options Additional options to control the query
   * @returns Event emitter with found, done, error events on textile.contacts.
   * @example
   * const { emitter, source } = textile.contacts.search(undefined, undefined, {wait: 5})
   * setTimeout(() => source.cancel(), 1000) // cancel after 1 second
   * emitter.on('textile.contacts.found', console.log)
   * emitter.on('textile.contacts.done', console.log)
   * })
   */
  search(username?: string, address?: string, options?: QueryOptions): RunningEvent {
    const opts = options || {}
    const allOpts: KeyValue = {
      username: username || '',
      address: address || '',
      local: (opts.local || false).toString(),
      remote: (opts.remote || false).toString(),
      limit: (opts.limit || 5).toString(),
      wait: (opts.wait || 2).toString()
    }
    const { conn, source } = this.sendPostCancelable('/api/v0/contacts/search', undefined, allOpts)
    const emitter = new EventEmitter2({
      wildcard: true
    })
    conn
      .then((response) => {
        const stream = response.data
        const results: QueryResults = {
          items: [],
          type: Query.Type.CONTACTS
        }
        stream.on('data', (data: Buffer) => {
          const result: QueryResult = JSON.parse(data.toString())
          results.items.push(result)
          emitter.emit('textile.contacts.found', result)
        })
        stream.on('end', () => {
          emitter.emit('textile.contacts.done', results)
        })
      })
      .catch((err: Error) => {
        emitter.emit('textile.contacts.error', err)
      })
    return { emitter, source }
  }
}
