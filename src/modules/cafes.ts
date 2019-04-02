import { API } from '../core/api'
import { ApiOptions, CafeSessionList, CafeSession } from '../models'

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
   * @param cafe The host Cafe public url
   * @param token An access token supplied by the target Cafe
   * @see Tokens#create
   * @returns A new Cafe session JWT
   */
  async add(cafe: string, token: string) {
    const response = await this.sendPost(`/api/v0/cafes`, [cafe], { token })
    return response.data as CafeSession
  }

  /**
   * Retrieves information about a cafe session
   *
   * @param id ID of the target Cafe
   * @returns A Cafe session JWT
   */
  async get(id: string) {
    const response = await this.sendGet(`/api/v0/cafes/${id}`)
    return response.data as CafeSession
  }

  /**
   * Retrieves information about all active cafe sessions
   * @returns An array of Cafe session JWTs
   */
  async list() {
    const response = await this.sendGet('/api/v0/cafes')
    return response.data as CafeSessionList
  }

  /**
   * Checkes for messages at all cafes.
   *
   * New messages are downloaded and processed opportunistically.
   * @returns Whether the operation was successfull
   */
  async checkMessages() {
    const response = await this.sendPost('/api/v0/cafes/messages')
    return response.status === 200
  }

  /**
   * Deregisters with a cafe and removes local session data
   *
   * Note: pinned content will expire based on the Cafe’s service rules.
   * @param id ID of the target Cafe
   * @returns Whether the deregistration was successfull
   */
  async remove(id: string) {
    const response = await this.sendDelete(`/api/v0/cafes/${id}`)
    return response.status === 204
  }
}
