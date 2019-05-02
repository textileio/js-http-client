import { API } from '../core/api'
import { Like, LikeList, Block } from '../models'

/**
 * Likes is an API module for managing thread/block likes
 *
 * Likes are added as blocks in a thread, which target another block, usually a file(s).
 *
 * @extends API
 */
export default class Likes extends API {
  /**
   * Adds a like to a block
   *
   * @param block Target block ID. Usually a file(s) block.
   * @returns The generated like block
   */
  async add(block: string) {
    const response = await this.sendPost(`blocks/${block}/likes`)
    return response.json() as Promise<Like>
  }

  /**
   * Retrieves a like by ID
   *
   * @param id ID of the target like
   * @returns The target like block
   */
  async get(id: string) {
    const response = await this.sendGet(`blocks/${id}/like`)
    return response.json() as Promise<Like>
  }

  /**
   * Retrieves a list of likes on a target block
   *
   * @param block ID of the target block
   * @returns An array of likes associated with the target block
   */
  async list(block: string) {
    const response = await this.sendGet(`blocks/${block}/likes`)
    return response.json() as Promise<LikeList>
  }

  /**
   * Ignores a block like by its ID
   *
   * This adds an 'ignore' thread block targeted at the like.
   * Ignored blocks are by default not returned when listing.
   *
   * @param id ID of the like
   * @returns The added ignore block
   */
  async ignore(id: string) {
    const response = await this.sendDelete(`blocks/${id}`)
    return response.json() as Promise<Block>
  }
}
