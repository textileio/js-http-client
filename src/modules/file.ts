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
   * @param file File object
   * @returns Raw data
   */
  async content(hash: string): Promise<string> {
    const response = await this.sendGet(`file/${hash}/data`)
    return response.text() as Promise<string>
  }
}
