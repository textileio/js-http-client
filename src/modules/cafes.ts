import { API } from '../core/api'
import { ApiOptions } from '../models/index'

/**
 * Cafes is an API module for managing Cafe access, messages, and services
 *
 * Cafes are other peers on the network who offer pinning, backup, and inbox services.
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class Cafes extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }

  /**
   * Registers with a cafe and saves an expiring service session token
   *
   * An access token is required to register, and should be obtained separately from the target
   * Cafe.
   *
   * @param {string} cafe The host Cafe public url
   * @param {string} token An access token supplied by the target Cafe
   * @see Tokens#create
   */
  async add(cafe: string, token: string) {
    const response = await this.sendPost(`/api/v0/cafes/`, [cafe], { token })
    return response.data
  }

  /**
   * Retrieves information about a cafe session
   *
   * @param {string} id ID of the target Cafe
   */
  async get(id: string) {
    const response = await this.sendGet(`/api/v0/cafes/${id}`)
    return response.data
  }

  /** Retrieves information about all active cafe sessions */
  async list() {
    const response = await this.sendGet('/api/v0/cafes')
    return response.data
  }

  /**
   * Checkes for messages at all cafes.
   *
   * New messages are downloaded and processed opportunistically.
   */
  async checkMessages() {
    this.sendPost('/api/v0/cafes/messages')
  }

  /**
   * Deregisters with a cafe and removes local session data
   *
   * Note: pinned content will expire based on the Cafe’s service rules.
   *
   * @param {string} id ID of the target Cafe
   */
  async remove(id: string) {
    this.sendDelete(`/api/v0/cafes/${id}`)
  }
}
