import { API } from '../../core/api.js'
import defaults from './defaults'
import { ApiOptions } from '../../models/index.js'
import pb from '@textile/go-mobile'

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

  /* eslint-disable class-methods-use-this */
  /** Default Textile schemas */
  async defaults() {
    return defaults
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Creates and validates a new schema from input JSON
   *
   * @param {object} schema Input JSON-based thread schema
   */
  // TODO: Verify type
  async add(schema: pb.AddThreadConfig.Schema) {
    const response = await this.sendPost(
      `/api/v0/mills/schema`,
      undefined,
      undefined,
      schema,
      { 'Content-Type': 'application/json' }
    )
    return response.data
  }

  /**
   * Retrieves a schema by thread ID
   *
   * @param {string} threadId ID of the thread
   */
  async get(threadId: string) {
    const response = await this.sendGet(`/api/v0/threads/${threadId}`)
    return response.data.schema_node
  }
}
