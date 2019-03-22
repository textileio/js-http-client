import { API } from '../core/api'
import { ApiOptions } from '../models/index'

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
   * Retrieve the local node's public profile
   * @returns {Promise<any>}
   */
  async get() {
    const response = await this.sendGet('/api/v0/profile')
    return response.data
  }

  /**
   * Get the local node's public profile username
   * @returns {Promise<string>} username
   */
  async username() {
    const { data } = await this.get()
    return data.username
  }

  /**
   * Set the local node's public profile username
   *
   * @param {string} username Username string
   */
  async setUsername(username: string) {
    this.sendPost('/api/v0/profile/username', [username])
  }

  /**
   * Get the local node's public profile avatar image hash
   * @returns {Promise<string>} hash
   */
  async avatar() {
    const { data } = await this.get()
    return data.avatar
  }

  /**
   * Set the local node's public profile avatar by specifying an existing image file hash
   *
   * @param {string} hash Image file hash
   */
  async setAvatar(hash: string) {
    this.sendPost('/api/v0/profile/avatar', [hash])
  }
}
