import { API } from '../core/api'
import { streamHandler } from '../helpers/handlers'
import { ApiOptions, QueryResult, Thread } from '../models'
import { ReadableStream } from 'web-streams-polyfill/ponyfill'

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
    const response = await this.sendPost('snapshots')
    return response.status === 201
  }

  /**
   * Search the network for thread snapshots
   *
   * @param wait Stops searching after 'wait' seconds have elapsed (max 30 default 2)
   * @returns A ReadableStream of QueryResult objects.
   */
  async search(wait?: number) {
    const response = await this.sendPost('snapshots/search', undefined, { wait: wait || 2 })
    if (!response.body) {
      throw Error('Empty response stream')
    }
    return streamHandler<QueryResult>(response.body as ReadableStream)
  }

  /**
   * Apply a single thread snapshot
   * @param id The snapshot id (omit to find and apply all snapshots)
   * @param wait Stops searching after 'wait' seconds have elapsed (max 30 default 2)
   * @returns A ReadableStream of QueryResult objects.
   */
  async apply(id?: string, wait?: number) {
    const stream = await this.search(wait)
    // For cancellation
    let isReader: any
    let cancellationRequest = false
    const self = this
    return new ReadableStream<QueryResult>({
      start(controller) {
        const reader = stream.getReader()
        isReader = reader
        const processResult = (result: ReadableStreamReadResult<QueryResult>) => {
          if (result.done) {
            if (cancellationRequest) {
              return // Immediately exit
            }
            controller.close()
            return
          }
          try {
            if (id === undefined || result.value.id === id) {
              self.applySnapshot(result.value).then((success) => {
                if (success) {
                  controller.enqueue(result.value)
                } else {
                  throw new Error('Unable to apply snapshot')
                }
              })
            }
          } catch (e) {
            controller.error(e)
            cancellationRequest = true
            reader.cancel(undefined)
            return
          }
          reader.read().then(processResult)
        }
        reader.read().then(processResult)
      },
      cancel(reason?: string) {
        cancellationRequest = true
        isReader.cancel(reason)
      }
    })
  }

  async applySnapshot(snapshot: QueryResult) {
    const snap: Thread = snapshot.value
    const response = await this.sendPut(`threads/${snap.id}`,
      undefined, undefined, snap)
    return response.status === 204
  }
}
