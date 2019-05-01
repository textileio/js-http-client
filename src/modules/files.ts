import { API } from '../core/api'
import { ApiOptions, Node, FilesList, Files as FilesType, Keys, DirectoryList } from '../models'
import SchemaMiller, { MillOpts } from '../helpers/schema-miller'
import Mills from './mills'
import Threads from './threads'

/**
 * Files is an API module for managing Textile files
 *
 * @param {ApiOptions} API options object
 * @extends {API}
 */
export default class Files extends API {
  opts: ApiOptions
  mills: Mills
  threads: Threads
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
    this.mills = new Mills(opts)
    this.threads = new Threads(opts)
  }

  /**
   * Retrieves a thread file by block ID
   *
   * @param id ID of the target file
   * @returns The thread object
   */
  async get(id: string) {
    const response = await this.sendGet(`files/${id}`)
    return response.json() as Promise<FilesType>
  }

  /**
   * Get a paginated array of files.
   *
   * @param thread Thread ID (can also use ‘default’). Omit for all
   * @param offset Offset ID to start listing from. Omit for latest
   * @param limit List page size (default 5)
   * @returns An array of Thread objects
   */
  async list(thread?: string, offset?: string, limit?: number) {
    const response = await this.sendGet('files', undefined, {
      thread: thread || '',
      offset: offset || '',
      limit: limit || 5
    })
    return response.json() as Promise<FilesList>
  }

  /**
   * Retrieves file encryption/decryption keys under the given target
   *
   * Note that the target id is _not_ the same as the block id. The target is the actual target
   * file object.
   *
   * @param target ID of the target file
   * @returns An array of file keys
   */
  async keys(target: string) {
    const response = await this.sendGet(`keys/${target}`)
    return response.json() as Promise<Keys>
  }

  /**
   * Ignores a thread file by its block ID
   *
   * This adds an 'ignore' thread block targeted at the file.
   * Ignored blocks are by default not returned when listing.
   *
   * @param id ID of the thread file
   * @returns Whether or not the operation was successfull
   */
  async ignore(id: string) {
    const response = await this.sendDelete(`blocks/${id}`)
    return response.status === 204
  }

  /**
   * Add a file to a thread in your Textile node
   *
   * @param thread Id of the thread
   * @param file A FormData object or a function for creating a FormData object
   * @param caption Caption to associated with the added file object
   * @returns An array of created File objects
   */
  async addFile(file: any, caption: string, thread?: string): Promise<FilesType> {
    if (!thread) {
      thread = 'default'
    }
    // Fetch schema (will throw if it doesn't have a schema node)
    const schemaNode: Node = (await this.threads.get(thread)).schema_node
    if (!schemaNode) {
      throw new Error('A thread schema is required before adding files to a thread.')
    }

    // Mill the file(s) before adding it
    const dir = await SchemaMiller.mill(
      file,
      schemaNode,
      async (mill: string, link: MillOpts, form: any, headers: { [key: string]: string }) => {
        const file = await this.mills.run(mill, link.opts, form, headers)
        return file
      }
    )
    // TODO: Do more than just wrap dirs in list
    const dirs: DirectoryList = {
      items: [dir]
    }
    const response = await this.sendPost(
      `threads/${thread}/files`, undefined, { caption }, dirs
    )
    return response.json()
  }
}
