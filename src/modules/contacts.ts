import { API } from '../core/api'
import { streamHandler } from '../helpers/handlers'
import { Contact, ContactList, QueryOptions, QueryResult } from '../models'
import { ReadableStream } from 'web-streams-polyfill/ponyfill'

/**
 * Contacts is an API module for managing local contacts and finding contacts on the network
 *
 * @extends API
 */
export default class Contacts extends API {
  /**
   * Adds or updates a contact directly, usually from a search
   *
   * @param contact JSON object representing a contact
   * @returns Whether the operation was sucessfull
   */
  async add(address: string, contact: Contact) {
    const response = await this.sendPut(
      `contacts/${address}`,
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
    const response = await this.sendGet(`contacts/${address}`)
    return response.json() as Promise<Contact>
  }

  /**
   * Retrieves a list of known contacts
   * @returns An array of all known contacts
   */
  async list() {
    const response = await this.sendGet('contacts')
    return response.json() as Promise<ContactList>
  }

  /**
   * Remove a known contact
   *
   * @param address Address of the contact
   * @returns Whether the operation was successfull
   */
  async remove(contactId: string) {
    const response = await this.sendDelete(`contacts/${contactId}`)
    return response.status === 204
  }

  /**
   * Searches locally and on the network for contacts by display name, peer id, or address
   *
   * @param name Search by display name string
   * @param address Search by account address string
   * @param options Additional options to control the query
   * @returns A ReadableStream of QueryResult objects.
   * })
   */
  async search(name?: string, address?: string, options?: QueryOptions) {
    const opts = options || {}
    const cleanOpts = {
      name: name || '',
      address: address || '',
      local: opts.local || false,
      remote: opts.remote || false,
      limit: opts.limit || 5,
      wait: opts.wait || 2
    }

    const response = await this.sendPost('contacts/search', undefined, cleanOpts)
    if (!response.body) {
      throw Error('Empty response stream')
    }
    return streamHandler<QueryResult>(response.body as ReadableStream)
  }
}
