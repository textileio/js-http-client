import { EventEmitter2 } from 'eventemitter2'
import { API } from '../core/api'
import { ApiOptions, RunningEvent, QueryResult, Thread, QueryResults, Query } from '../models'

/**
 * Snapshots is an API module for managing thread snapshots
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class Snapshots extends API {
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }

  /**
   * Snapshot all threads and push to registered cafes
   *
   * @returns Whether the snapshot process was successfull
   */
  async create() {
    const response = await this.sendPost('/api/v0/snapshots')
    return response.status === 201
  }

  /**
   * Search the network for thread snapshots
   *
   * Returns streaming connection and a cancel function to cancel the request.
   *
   * @param wait Stops searching after 'wait' seconds have elapsed (max 30 default 2)
   * @returns Event emitter with found, done, error events on textile.snapshots.
   * The Event emitter has an additional cancel method that can be used to cancel the search.
   */
  search(wait?: number): RunningEvent {
    const { conn, source } = this.sendPostCancelable(
      '/api/v0/snapshots/search',
      undefined,
      { wait: (wait || 2).toString() }
    )
    const emitter = new EventEmitter2({
      wildcard: true
    })
    conn
      .then((response) => {
        const stream = response.data
        const results: QueryResults = {
          items: [],
          type: Query.Type.THREAD_SNAPSHOTS
        }
        stream.on('data', (data: Buffer) => {
          const result: QueryResult = JSON.parse(data.toString())
          results.items.push(result)
          emitter.emit('textile.snapshots.found', result)
        })
        stream.on('end', () => {
          emitter.emit('textile.snapshots.done', results)
        })
      })
      .catch((err: Error) => {
        emitter.emit('textile.snapshots.error', err)
      })
    return { emitter, source }
  }

  /**
   * Apply a single thread snapshot
   * @param id The snapshot id (omit to find and apply all snapshots)
   * @param wait Stops searching after 'wait' seconds have elapsed (max 30 default 2)
   * @returns Event emitter with found, applied, done, error events on textile.snapshots.
   * The Event emitter has an additional cancel method that can be used to cancel the search.
   * TODO: Better document the event emmitter, because its quite useful for collecting
   * aggregate results as well.
   */
  apply(id?: string, wait?: number): RunningEvent {
    const { emitter, source } = this.search(wait)
    emitter.on('textile.snapshots.found', (snapshot: QueryResult) => {
      if (id === undefined || snapshot.id === id) {
        this.applySnapshot(snapshot).then((success: boolean) => {
          emitter.emit('textile.snapshots.applied', success)
        })
      }
    })
    return { emitter, source }
  }

  async applySnapshot(snapshot: QueryResult) {
    const snap: Thread = snapshot.value
    const response = await this.sendPut(`/api/v0/threads/${snap.id}`,
      undefined, undefined, snap)
    return response.status === 204
  }
}
