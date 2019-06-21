import { API, DEFAULT_API_OPTIONS } from '../core/api'
import { ApiOptions, Block, BlockList } from '../models'
import Threads from './threads'

const dot = '%2E' // needed as curl shortens /. to /

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
 * @extends {API}
 */
export default class Blocks extends API {
  threads: Threads
  constructor(opts: ApiOptions = DEFAULT_API_OPTIONS) {
    super(opts)
    this.threads = new Threads(opts)
  }

  /**
   * Retrieves a block by ID
   *
   * @param id ID of the target block
   * @returns The block object
   */
  async meta(id: string) {
    const response = await this.sendGet(`blocks/${id}/meta`)
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
   * Ignores a block by its ID
   *
   * @param id ID of the block
   * @returns The added ignore block
   */
  async ignore(id: string) {
    const response = await this.sendDelete(`blocks/${id}`)
    return response.json() as Promise<Block>
  }

  /**
   * Get the decrypted file content of a file within a files block
   *
   * @param id ID of the target block
   * @param index Index of the target file (defaults to '0')
   * @param path Path of the target file under the index (e.g., 'small')
   * @returns The file contents as an arrayBuffer (for a blob, use `file.content()`)
   */
  async fileContent(id: string, index?: string, path?: string) {
    const response = await this.sendGet(`blocks/${id}/files/${index || '0'}/${path || dot}/content`)
    return response.arrayBuffer()
  }

  /**
   * Get the metadata of a file within a files block
   *
   * @param id ID of the target block
   * @param index Index of the target file (defaults to '0')
   * @param path Path of the target file under the index (e.g., 'small')
   * @returns The file contents as an arrayBuffer (for a blob, use `file.meta()`)
   */
  async fileMeta(id: string, index?: string, path?: string) {
    const response = await this.sendGet(`blocks/${id}/files/${index || '0'}/${path || dot}/meta`)
    return response.arrayBuffer()
  }
}
