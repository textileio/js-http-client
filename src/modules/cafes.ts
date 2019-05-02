import { API } from '../core/api'
import { CafeSessionList, CafeSession } from '../models'

/**
 * Cafes is an API module for managing Cafe access, messages, and services
 *
 * Cafes are other peers on the network who offer pinning, backup, and inbox services.
 *
 * @extends API
 */
export default class Cafes extends API {
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
    const response = await this.sendPost(`cafes`, [cafe], { token })
    return response.json() as Promise<CafeSession>
  }

  /**
   * Retrieves information about a cafe session
   *
   * @param id ID of the target Cafe
   * @returns A Cafe session JWT
   */
  async get(id: string) {
    const response = await this.sendGet(`cafes/${id}`)
    return response.json() as Promise<CafeSession>
  }

  /**
   * Retrieves information about all active cafe sessions
   * @returns An array of Cafe session JWTs
   */
  async list() {
    const response = await this.sendGet('cafes')
    return response.json() as Promise<CafeSessionList>
  }

  /**
   * Checkes for messages at all cafes.
   *
   * New messages are downloaded and processed opportunistically.
   * @returns Whether the operation was successfull
   */
  async checkMessages() {
    const response = await this.sendPost('cafes/messages')
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
    const response = await this.sendDelete(`cafes/${id}`)
    return response.status === 204
  }
}
