import { API } from '../core/api'
import { ApiOptions, Text, TextList, Block } from '../models'

/**
 * Messages is an API module for managing thread/block messages
 *
 * Messages are added as blocks in a thread
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class Messages extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }

  /**
   * Adds a message to a thread
   *
   * @param thread Thread ID
   * @param body Message body
   * @returns The generated message block
   */
  async add(thread: string, body: string) {
    const response = await this.sendPost(`/api/v0/threads/${thread}/messages`, [
      encodeURI(body)
    ])
    return response.data as Text
  }

  /**
   * Retrieves a message by block ID
   *
   * @param id ID of the target message
   * @returns The target message block
   */
  async get(id: string) {
    const response = await this.sendGet(`/api/v0/messages/${id}`)
    return response.data as Text
  }

  /**
   * Retrieves thread messages
   *
   * @param thread Thread ID (can also use ‘default’)
   * @param offset Offset ID to start listing from (omit for latest)
   * @param limit List page size (default: 5)
   * @returns An array of message blocks
   */
  async list(thread?: string, offset?: string, limit?: number) {
    const response = await this.sendGet('/api/v0/messages', undefined, {
      thread: thread || '',
      offset: offset || '',
      limit: limit || 5
    })
    return response.data as TextList
  }

  /**
   * Ignores a thread message by its ID
   *
   * This adds an 'ignore' thread block targeted at the comment.
   * Ignored blocks are by default not returned when listing.
   *
   * @param id ID of the message
   * @returns The added ignore block
   */
  async ignore(id: string) {
    const response = await this.sendDelete(`/api/v0/blocks/${id}`)
    return response.data as Block
  }
}
