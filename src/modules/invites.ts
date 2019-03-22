import { API } from '../core/api'
import { ApiOptions } from '../models'

/**
 * Invites is an API module for managing thread invites
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class Invites extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }

  /**
   * Accept an invite to a thread
   *
   * @param {string} invite Invite ID
   * @param {string} key Key for an external invite
   */
  async accept(invite: string, key: string) {
    const response = await this.sendPost(
      `/api/v0/invites/${invite}/accept`,
      undefined,
      { key }
    )
    return response.data
  }

  /**
   * Create a peer-to-peer or external invite to a thread
   *
   * @param {string} thread Thread ID (can also use ‘default’)
   * @param {string} [peer] Peer ID (omit to create an external invite)
   */
  async create(thread: string, peer: string) {
    const response = await this.sendPost(`/api/v0/invites/`, undefined, {
      thread,
      peer
    })
    return response.data
  }

  /** Lists all pending thread invites */
  async list() {
    const response = await this.sendGet('/api/v0/invites')
    return response.data
  }

  /**
   * Ignore a direct invite to a thread
   *
   * @param {string} id ID of the invite
   */
  async ignore(id: string) {
    this.sendPost(`/api/v0/invites/${id}/ignore`)
  }
}
