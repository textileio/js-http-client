import { API } from '../core/api'
import { ApiOptions, Versions, Summary } from '../models'

/**
 * Utils is an API module for various Textile node utilities
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class Utils extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }

  /**
   * Get the current node's API, and application versions
   * @returns Version of Cafe API and node binary release
   */
  async version() {
    const response = await this.sendGet('/')
    return response.data as Versions
  }

  /**
   * Get a summary of all local node data
   * @returns Summary of node activity
   */
  async nodeSummary() {
    const response = await this.sendGet('api/v0/summary')
    return response.data as Summary
  }

  /**
   * Check whether the underlying node's API is online
   * @returns Whether the API is online
   */
  async online() {
    const response = await this.sendGet('/health')
    return response.status === 204
  }
}
