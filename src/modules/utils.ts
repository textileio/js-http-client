import { API } from '../core/api'
import { Versions, Summary } from '../models'

/**
 * Utils is an API module for various Textile node utilities
 *
 * @extends API
 */
export default class Utils extends API {
  /**
   * Get the current node's API, and application versions
   * @returns Version of Cafe API and node binary release
   */
  async version() {
    const response = await this.sendGet('../../')
    return response.json() as Promise<Versions>
  }

  /**
   * Get a summary of all local node data
   * @returns Summary of node activity
   */
  async summary() {
    const response = await this.sendGet('summary')
    return response.json() as Promise<Summary>
  }

  /**
   * Pings another peer on the network, returning wherther they are online or offline.
   * @param id The peer id
   * @returns Whether the peer is online
   */
  async ping(id: string) {
    const response = await this.sendGet('ping')
    return response.text()
  }

  /**
   * Check whether the underlying node's API is online
   * @returns Whether the API is online
   */
  async online() {
    const response = await this.sendGet('../../health')
    return response.status === 204
  }
}
