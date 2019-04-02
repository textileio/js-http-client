import { API } from '../core/api'
import { ApiOptions, Contact } from '../models/index'

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
   * Retrieve the local node's public profile contact information
   * @returns The local node's contact information
   */
  async get() {
    const response = await this.sendGet('/api/v0/profile')
    return response.data as Contact
  }

  /**
   * Get the local node's public profile username
   * @returns Node's public profile username
   */
  async username() {
    const contact = await this.get()
    return contact.name
  }

  /**
   * Set the local node's public profile username
   *
   * @param username Username string
   * @returns Whether the update was successful
   */
  async setUsername(username: string) {
    const response = await this.sendPost('/api/v0/profile/username', [username])
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
    const response = await this.sendPost('/api/v0/profile/avatar', [hash])
    return response.status === 201
  }
}
