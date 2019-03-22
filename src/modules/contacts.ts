import { EventEmitter2 } from 'eventemitter2'
import axios, { AxiosResponse } from 'axios'
import { API } from '../core/api'
import { ApiOptions, KeyValue, RunningEvent } from '../models/index'
import pb from '@textile/go-mobile'

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
   * @param {object} contact JSON object representing a contact
   * @returns {Promise<string>} address
   */
  async add(info: KeyValue) {
    const response = await this.sendPut(
      `/api/v0/contacts/${info.id}`,
      undefined,
      undefined,
      info
    )
    return response.data
  }

  /**
   * Retrieve information about a known contact
   *
   * @param {string} contact ID of the contact
   */
  async get(contact: string) {
    const response = await this.sendGet(`/api/v0/contacts/${contact}`)
    return response.data
  }

  /**
   * Retrieves a list of known contacts
   *
   * @param {string} thread ID of the thread
   */
  async list(threadId: string) {
    const response = await this.sendGet('/api/v0/contacts', undefined, { threadId })
    return response.data
  }

  /**
   * Remove a known contact
   *
   * @param {string} contact ID of the contact
   */
  async remove(contactId: string) {
    this.sendDelete(`/api/v0/contacts/${contactId}`)
  }

  /**
   * Retrieve all threads shared with the given contact
   *
   * @param {string} contact ID of the contact
   */
  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  async threads(contact: string) {
    throw new ReferenceError('Not implemented')
  }

  /**
   * Searches locally and on the network for contacts by username, peer id, or address
   *
   * @param {Object} [options] Search options to send as headers
   * @param {string} [options.local] Whether to only search local contacts (default false)
   * @param {string} [options.limit] Stops searching after 'limit' results are found (defaut 5)
   * @param {string} [options.wait] Stops searching after ‘wait’ seconds have elapsed (max 10s, default 5s)
   * @param {string} [options.peer] Search by peer id string
   * @param {string} [options.username] Search by username string
   * @param {string} [options.address] Search by account address string
   * @returns {EventEmitter2} Event emitter with found, done, error events on textile.contacts.
   * The Event emitter has an additional cancel method that can be used to cancel the search.
   * @example
   * const backups = textile.account.search({wait: 5})
   * setTimeout(() => backups.cancel(), 1000) // cancel after 1 second
   * backups.on('textile.contacts.found', found => {
   *   console.log(found)
   * })
   * backups.on('*.done', cancelled => {
   *   console.log(`search was ${cancelled ? 'cancelled' : 'completed'}`)
   * })
   */
  search(options: pb.IContactQuery): RunningEvent {
    const { conn, source } = this.sendPostCancelable(
      '/api/v0/contacts/search',
      undefined,
      undefined,
      // TODO: need to convert to normal payload?
      options
    )
    const emitter = new EventEmitter2({
      wildcard: true
    })
    conn
      .then((response: AxiosResponse) => {
        const stream = response.data
        stream.on('data', (chunk: string) => {
          emitter.emit('textile.contacts.found', chunk)
        })
        stream.on('end', () => {
          emitter.emit('textile.contacts.done', false)
        })
      })
      .catch((err: Error) => {
        if (axios.isCancel(err)) {
          emitter.emit('textile.contacts.done', true)
        } else {
          emitter.emit('textile.contacts.error', err)
        }
      })
    return {emitter, source}
  }
}
