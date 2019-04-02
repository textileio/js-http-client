import { API } from '../core/api'
import { ApiOptions, Thread, ThreadList, ContactList } from '../models/index'
import Snapshots from './snapshots'

export type ThreadType = 'private' | 'read_only' | 'public' | 'open'
export type ThreadSharing = 'not_shared' | 'invite_only' | 'shared'

/**
 * Threads is an API module for managing Textile threads
 *
 * Threads are distributed sets of encrypted files between peers governed by build-in or
 * custom Schemas.
 *
 * Thread type controls read (R), annotate (A), and write (W) access:
 *
 * private  --> initiator: RAW, members:
 * readonly --> initiator: RAW, members: R
 * public   --> initiator: RAW, members: RA
 * open     --> initiator: RAW, members: RAW
 *
 * Thread sharing style controls if (Y/N) a thread can be shared:
 *
 * notshared  --> initiator: N, members: N
 * inviteonly --> initiator: Y, members: N
 * shared     --> initiator: Y, members: Y
 *
 * @param {Object} opts Connection options object
 * @param {string} opts.url
 * @extends API
 */
export default class Threads extends API {
  opts: ApiOptions
  snapshots: Snapshots
  constructor(opts: ApiOptions) {
    super(opts)
    this.snapshots = new Snapshots(opts)
    this.opts = opts
  }

  /**
   * Adds and joins a new thread
   *
   * @param name The name of the new thread
   * @param key A locally unique key used by an app to identify this thread on recovery
   * @param type The type of thread, must be one of 'private' (default), 'read_only', 'public', or 'open'
   * @param sharing The sharing style of thread, must be one of 'notshared'
   * (default), 'inviteonly', or 'shared'
   * @param members An array of contact addresses. When supplied, the thread will not allow
   * additional peers, useful for 1-1 chat/file sharing or private groups.
   * @param schema Schema ID for the new thread
   * @returns The newly generated thread info
   */
  async add(name: string, schema?: string, key?: string, type?: ThreadType, sharing?: ThreadSharing, members?: string[]) {
    const response = await this.sendPost(
      '/api/v0/threads',
      [name],
      undefined,
      {
        schema: schema || '',
        key: key || '',
        type: type || 'private',
        sharing: sharing || 'not_shared',
        members: members || []
      }
    )
    return response.data as Thread
  }

  /**
   * Adds or updates a thread directly, usually from a backup
   *
   * @param thread ID of the thread
   * @param info Thread object
   */
  async addOrUpdate(thread: string, info: Thread) {
    this.sendPut(`/api/v0/threads/${thread}`, undefined, undefined, info)
  }

  /**
   * Retrieve a thread by ID
   *
   * @param thread ID of the thread
   * @returns A thread object
   */
  async get(thread: string) {
    const response = await this.sendGet(`/api/v0/threads/${thread}`)
    return response.data as Thread
  }

  /**
   * Lists all local threads
   *
   * @returns An array of threads
   */
  async list() {
    const response = await this.sendGet('/api/v0/threads')
    return response.data as ThreadList
  }

  /**
   * Leave and remove a thread a thread by ID
   *
   * @param thread ID of the thread
   * @returns Whether the thread removal was successfull
   */
  async remove(thread: string) {
    const response = await this.sendDelete(`/api/v0/threads/${thread}`)
    return response.status === 204
  }

  /**
   * Gets information about the default thread (if selected)
   *
   * @returns Info about the default thread
   */
  async default() {
    const response = await this.sendGet('/api/v0/threads/default')
    return response.data as Thread
  }

  /**
   * Renames a thread
   *
   * Note: Only initiators can rename a thread.
   * @param thread ID of the thread
   * @param name New name for the thread
   * @returns Whether the rename was successfull
   */
  async rename(thread: string, name: string) {
    const response = await this.sendPut(`/api/v0/threads/${thread}/name`)
    return response.status === 204
  }

  /**
   * List all peers in a thread
   *
   * @param thread ID of the thread (default is 'default').
   * @returns An array of thread contacts
   */
  async peers(thread: string) {
    const response = await this.sendGet(`/api/v0/threads/${thread || 'default'}/peers`)
    return response.data as ContactList
  }
}
