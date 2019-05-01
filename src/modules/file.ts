import { API } from '../core/api'
import { ApiOptions } from '../models'

/**
 * File is an API module for requesting information about a Textile File
 *
 * @param {ApiOptions} API options object
 * @extends {API}
 */
export default class File extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }
  /**
   *
   * Get raw data for a File
   *
   * @param file File object
   * @returns Raw data
   */
  async content(hash: string): Promise<string> {
    const response = await this.sendGet(`file/${hash}/data`)
    return response.text() as Promise<string>
  }
}
