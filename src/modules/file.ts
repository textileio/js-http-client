import { API } from '../core/api'

/**
 * File is an API module for requesting information about a Textile File
 *
 * @extends {API}
 */
export default class File extends API {

  /**
   *
   * Get raw data for a File
   *
   * @param hash The hash for the requested file
   * @returns Raw data
   */
  async content(hash: string) {
    const response = await this.sendGet(`file/${hash}/content`)
    return response.blob()
  }
}
