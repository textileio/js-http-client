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
    // @todo: change this (back) to `response.arrayBuffer()`?
    return response.blob()
  }

  /**
   *
   * Get metadata for a File
   *
   * @param target The hash for the target file
   * @returns Metadata object
   */
  async meta(target: string) {
    const response = await this.sendGet(`file/${target}/meta`)
    return response.json()
  }
}
