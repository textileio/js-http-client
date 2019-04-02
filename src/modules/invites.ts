import { API } from '../core/api'
import { ApiOptions, Block, ExternalInvite, InviteViewList } from '../models'

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
   * @param invite Invite ID
   * @param key Key for an external invite
   */
  async accept(invite: string, key?: string) {
    const response = await this.sendPost(
      `/api/v0/invites/${invite}/accept`,
      undefined,
      { key: key || '' }
    )
    return response.data as Block
  }

  /**
   * Create a peer-to-peer or external invite to a thread
   *
   * @param thread Thread ID (can also use ‘default’)
   * @param address Account Address (omit to create an external invite)
   * @returns An external invite object
   * @see Contacts#search for searching for contacts prior to an invite
   */
  async create(thread: string, address?: string) {
    const response = await this.sendPost(`/api/v0/invites/`, undefined, {
      thread,
      address: address || ''
    })
    return response.data as ExternalInvite
  }

  /**
   * Lists all pending thread invites
   * @returns An array of invite views
   */
  async list() {
    const response = await this.sendGet('/api/v0/invites')
    return response.data as InviteViewList
  }

  /**
   * Ignore a direct invite to a thread
   *
   * @param id ID of the invite
   * @returns Whether the operation was successfull
   */
  async ignore(id: string) {
    const response = await this.sendPost(`/api/v0/invites/${id}/ignore`)
    return response.status === 200
  }
}
