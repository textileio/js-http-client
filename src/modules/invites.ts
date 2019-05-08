import { API } from '../core/api'
import { Block, ExternalInvite, InviteViewList } from '../models'

/**
 * Invites is an API module for managing thread invites
 *
 * @extends API
 */
export default class Invites extends API {
  /**
   * Accept an invite to a thread
   *
   * @param invite Invite ID
   * @param key Key for an external invite
   */
  async accept(invite: string, key?: string) {
    const response = await this.sendPost(
      `invites/${invite}/accept`,
      undefined,
      { key: key || '' }
    )
    return response.json() as Promise<Block>
  }

  /**
   * Adds a peer-to-peer invite to a thread
   *
   * @param thread Thread ID (can also use ‘default’)
   * @param address Account Address (omit to create an external invite)
   * @returns A p2p invite object
   * @see Contacts#search for searching for contacts prior to an invite
   */
  async add(thread: string, address: string) {
    const response = await this.sendPost(`invites/`, undefined, {
      thread,
      address: address || ''
    })
    return response.json() as Promise<ExternalInvite>
  }

  /**
   * Adds a external invite to a thread
   *
   * @param thread Thread ID (can also use ‘default’)
   * @returns An external invite object
   */
  async addExternal(thread: string) {
    const response = await this.sendPost(`invites/`, undefined, {
      thread
    })
    return response.json() as Promise<ExternalInvite>
  }

  /**
   * Lists all pending thread invites
   * @returns An array of invite views
   */
  async list() {
    const response = await this.sendGet('invites')
    return response.json() as Promise<InviteViewList>
  }

  /**
   * Ignore a direct invite to a thread
   *
   * @param id ID of the invite
   * @returns Whether the operation was successfull
   */
  async ignore(id: string) {
    const response = await this.sendPost(`invites/${id}/ignore`)
    return response.status === 200
  }
}
