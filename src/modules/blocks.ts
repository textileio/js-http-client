import { API } from '../core/api'
import { ApiOptions, Block, BlockList } from '../models'
import Threads from './threads'

/**
 * Blocks is an API module for managing Textile blocks
 *
 * Blocks are the raw components in a thread. Think of them as an append-only log of thread updates
 * where each update is hash-linked to its parent(s). New / recovering peers can sync history by
 * simply traversing the hash tree.
 *
 * There are several block types:
 *
 * -  MERGE:    3-way merge added.
 * -  IGNORE:   A block was ignored.
 * -  FLAG:     A block was flagged.
 * -  JOIN:     Peer joined.
 * -  ANNOUNCE: Peer set username / avatar / inbox addresses
 * -  LEAVE:    Peer left.
 * -  TEXT:     Text message added.
 * -  FILES:    File(s) added.
 * -  COMMENT:  Comment added to another block.
 * -  LIKE:     Like added to another block.
 *
 * @param {ApiOptions} API options object
 * @extends {API}
 */
export default class Blocks extends API {
  opts: ApiOptions
  threads: Threads
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
    this.threads = new Threads(opts)
  }

  /**
   * Retrieves a block by ID
   *
   * @param id ID of the target block
   * @returns The thread object
   */
  async get(id: string) {
    const response = await this.sendGet(`blocks/${id}`)
    return response.json() as Promise<Block>
  }

  /**
   * Get a paginated array of files.
   *
   * @param thread Thread ID (can also use ‘default’). Omit for all
   * @param offset Offset ID to start listing from. Omit for latest
   * @param limit List page size (default 5)
   * @returns An array of Block objects
   */
  async list(thread?: string, offset?: string, limit?: number) {
    const response = await this.sendGet('blocks', undefined, {
      thread: thread || '',
      offset: offset || '',
      limit: limit || 5
    })
    return response.json() as Promise<BlockList>
  }

  /**
   * Remove a thread block by ID
   *
   * @param id ID of the block
   * @returns Whether or not the operation was successful
   */
  async remove(id: string) {
    const response = await this.sendDelete(`blocks/${id}`)
    return response.status === 204
  }
}
