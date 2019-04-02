import { API } from '../../core/api.js'
import * as defaults from './defaults'
import { ApiOptions, Node, FileIndex } from '../../models'

/**
 * Schemas is an API module for managing Textile schemas
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class Schemas extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }

  /**
   * Default Textile schemas
   * @returns An object with various commonly used schemas
   */
  async defaults() {
    return defaults
  }

  /**
   * Creates and validates a new schema from input JSON
   *
   * @param schema Input JSON-based thread schema
   * @returns The milled schema as a file index
   */
  async add(schema: object) {
    const response = await this.sendPost(
      `/api/v0/mills/schema`,
      undefined,
      undefined,
      schema,
      { 'Content-Type': 'application/json' }
    )
    return response.data as FileIndex
  }

  /**
   * Retrieves a schema by thread ID
   *
   * @param thread ID of the thread
   * @returns The schema of the target thread
   */
  async get(thread: string) {
    const response = await this.sendGet(`/api/v0/threads/${thread}`)
    return response.data.schema_node as Node
  }
}
