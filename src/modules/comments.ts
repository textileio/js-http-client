import { API } from '../core/api.js'
import { ApiOptions } from '../models/index'

/**
 * Comments is an API module for managing thread/block comments
 *
 * Comments are added as blocks in a thread, which target another block, usually a file(s).
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class Comments extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }

  /**
   * Adds a comment to a block
   *
   * @param {string} block Target block ID. Usually a file(s) block.
   * @param {string} body Comment body
   */
  async add(block: string, body: string) {
    const response = await this.sendPost(`/api/v0/blocks/${block}/comments`, [
      encodeURIComponent(body)
    ])
    return response.data
  }

  /**
   * Retrieves a comment by ID
   *
   * @param {string} id ID of the target comment
   */
  async get(id: string) {
    const response = await this.sendGet(`/api/v0/blocks/${id}/comment`)
    return response.data
  }

  /**
   * Retrieves a list of comments on a target block
   *
   * @param {string} block ID of the target block
   */
  async list(block: string) {
    const response = await this.sendGet(`/api/v0/blocks/${block}/comments`)
    return response.data
  }

  /**
   * Ignores a block comment by its ID
   *
   * This adds an 'ignore' thread block targeted at the comment.
   * Ignored blocks are by default not returned when listing.
   *
   * @param {string} id ID of the comment
   */
  async ignore(id: string) {
    this.sendDelete(`/api/v0/blocks/${id}`)
  }
}
