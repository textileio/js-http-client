import { API } from '../../core/api'
import defaults from './defaults'
import { Node, FileIndex } from '../../models'

/**
 * Schemas is an API module for managing Textile schemas
 *
 * @extends API
 */
export default class Schemas extends API {
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
    return response.json() as Promise<FileIndex>
  }

  /**
   * Retrieves a schema by thread ID
   *
   * @param thread ID of the thread
   * @returns The schema of the target thread
   */
  async get(thread: string) {
    const response = await this.sendGet(`/api/v0/threads/${thread}`)
    return (await response.json()).schema_node as Node
  }
}
