import { API } from '../core/api'
import { ApiOptions, Peer } from '../models/index'

/**
 * Profile is an API module for accessing public profile information
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class Profile extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }

  /**
   * Retrieve the local node's public profile peer information
   * @returns The local node's peer information
   */
  async get() {
    const response = await this.sendGet('profile')
    return response.json() as Promise<Peer>
  }

  /**
   * Get the local node's public profile display name
   * @returns Node's public profile display name
   */
  async name() {
    const contact = await this.get()
    return contact.name
  }

  /**
   * Set the local node's public profile display name
   *
   * @param name Username string
   * @returns Whether the update was successful
   */
  async setName(name: string) {
    const response = await this.sendPost('profile/name', [name])
    return response.status === 201
  }

  /**
   * Get the local node's public profile avatar image hash
   * @returns Node's public profile avatar image hash
   */
  async avatar() {
    const contact = await this.get()
    return contact.avatar
  }

  /**
   * Set the local node's public profile avatar by specifying an existing image file hash
   *
   * @param hash Image file hash
   * @returns Whether the update was successful
   */
  async setAvatar(hash: string) {
    const response = await this.sendPost('profile/avatar', [hash])
    return response.status === 201
  }
}
