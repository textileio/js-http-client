import { API } from '../core/api'
import { Comment, CommentList, Block } from '../models'

/**
 * Comments is an API module for managing thread/block comments
 *
 * Comments are added as blocks in a thread, which target another block, usually a file(s).
 *
 * @extends API
 */
export default class Comments extends API {
  /**
   * Adds a comment to a block
   *
   * @param block Target block ID. Usually a file(s) block.
   * @param body Comment body
   * @returns The generated comment block
   */
  async add(block: string, body: string) {
    const response = await this.sendPost(
      `blocks/${block}/comments`, [body]
    )
    return response.json() as Promise<Comment>
  }

  /**
   * Retrieves a comment by ID
   *
   * @param id ID of the target comment
   * @returns The target comment block
   */
  async get(id: string) {
    const response = await this.sendGet(`blocks/${id}/comment`)
    return response.json() as Promise<Comment>
  }

  /**
   * Retrieves a list of comments on a target block
   *
   * @param block ID of the target block
   * @returns An array of comment blocks
   */
  async list(block: string) {
    const response = await this.sendGet(`blocks/${block}/comments`)
    return response.json() as Promise<CommentList>
  }

  /**
   * Ignores a block comment by its ID
   *
   * This adds an 'ignore' thread block targeted at the comment.
   * Ignored blocks are by default not returned when listing.
   *
   * @param id ID of the comment
   * @returns The ignored block
   */
  async ignore(id: string) {
    const response = await this.sendDelete(`blocks/${id}`)
    return response.json() as Promise<Block>
  }
}
