import { API } from '../core/api'
import { KeyValue, FileIndex } from '../models'
import FormData from 'isomorphic-form-data'

/**
 * Mills is an API module for processing Textile mills
 *
 * @extends API
 */
export default class Mills extends API {
  /**
   * Run a mill over a given payload
   *
   * Currently supports:
   * * `/blob` - Process raw data blobs
   * * `/image/exif` - Extract EXIF data from an image
   * * `/image/resize` - Resize an image
   * * `/json` - Process (and validate according to schema.org definition) input JSON data
   * * `/schema` - Validate, add, and pin a new JSON-based Schema
   *
   * @param {string} name Name of the mill. (Relative uri). See above description for details
   * @param {KeyValue} options Schema options for the mill
   * @param {any} payload A multi-part form containing the payload
   * @param {KeyValue} [headers] Extra headers to send in the request
   * @returns The generated FileIndex object
   */
  async run(name: string, options: KeyValue, payload: any, headers: KeyValue): Promise<FileIndex> {
    let data: any
    if (payload && name !== '/json' && name !== '/schema') {
      // Unless explicitly using a json-based mill, assume binary data
      data = new FormData()
      data.append('file', payload, payload.name || 'milled')
    } else if (payload) {
      // Otherwise, assume JSON data
      data = JSON.stringify(payload)
    }
    const response = await this.sendPost(
      `mills${name}`,
      [],
      options,
      data,
      headers,
      true // Don't strinify on the other end
    )
    return response.json()
  }
}
