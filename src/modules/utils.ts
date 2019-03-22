import { API } from '../core/api'
import { ApiOptions } from '../models'

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

  /** Get the current node's API, and application versions */
  async version() {
    const response = await this.sendGet('/')
    return response.data
  }

  /** Get a summary of all local node data */
  async nodeSummary() {
    const response = await this.sendGet('api/v0/summary')
    return response.data
  }

  /** Get a summary of all local node data */
  async online() {
    const response = await this.sendGet('/health')
    return response.status === 204
  }
}
