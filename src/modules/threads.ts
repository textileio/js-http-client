import { API } from '../core/api'
import { ApiOptions } from '../models/index'
import pb from '@textile/go-mobile'

/**
 * Threads is an API module for managing Textile threads
 *
 * @param {Object} opts Connection options object
 * @param {string} opts.url
 * @extends API
 */
export default class Threads extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }

  /**
   * Adds and joins a new thread
   *
   * @param {string} name The name of the new thread
   * @param {Object} [options] Additional options to send as headers
   * @param {string} [options.key] A locally unique key used by an app to identify this thread on
   * recovery
   * @param {string} [options.type] The type of thread, must be one of 'private' (default),
   * 'readonly', 'public', or 'open'
   * @param {string} [options.sharing] The sharing style of thread, must be one of 'notshared'
   * (default), 'inviteonly', or 'shared'
   * @param {string[]} [options.members] An array of contact addresses. When supplied, the thread
   * will not allow additional peers, useful for 1-1 chat/file sharing or private groups.
   * @param {string} [options.schema] Schema ID for the new thread
   * @example
   * await textile.thread.add('MyMedia', {
   *   schema: mediaSchema.id,
   *   type: 'open',
   *   sharing: 'shared'
   * })
   */
  async add(name: string, options: pb.IAddThreadConfig) {
    const response = await this.sendPost(
      '/api/v0/threads',
      [name],
      undefined,
      options
    )
    return response.data
  }

  /**
   * Adds or updates a thread directly, usually from a backup
   *
   * @param {string} thread ID of the thread
   * @param {object} info Thread object
   */
  async addOrUpdate(thread: string, info: string) {
    this.sendPut(
      `/api/v0/threads/${thread}`,
      undefined,
      undefined,
      info
    )
  }

  /**
   * Retrieve a thread by ID
   *
   * @param {string} thread ID of the thread
   */
  async get(thread: string) {
    const response = await this.sendGet(`/api/v0/threads/${thread}`)
    return response.data
  }

  /** Retrieves a list of threads */
  async list() {
    const response = await this.sendGet('/api/v0/threads')
    return response.data
  }

  /**
   * Remove a thread by ID
   *
   * @param {string} thread ID of the thread
   */
  async remove(thread: string) {
    this.sendDelete(`/api/v0/threads/${thread}`)
  }

  /** Gets information about the default thread (if selected) */
  async default() {
    const response = await this.sendGet('/api/v0/threads/default')
    return response.data
  }

  /**
   * List all peers in a thread
   *
   * @param {string} thread ID of the thread. Omit for default.
   */
  async peers(thread: string) {
    const response = await this.sendGet(
      `/api/v0/threads/${thread || 'default'}/peers`
    )
    return response.data
  }
}
