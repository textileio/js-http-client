import { API, DEFAULT_API_OPTIONS } from '../core/api'
import { ApiOptions, MobileQueryEvent } from '../models'
import { ReadableStream } from 'web-streams-polyfill/ponyfill'

class EventSubscription {
  cancel: () => void
  constructor(cancel: () => void) {
    this.cancel = cancel
  }
}

/**
 * Events is an API to stream updates from an ipfs pubsub
 */
export default class Events extends API {
  private pubsubQueryResultListeners: Array<{
    listener: (queryId: string, message: string, messageId: string) => void,
    queryId: string
  }>
  private queryDoneListeners: Array<{
    listener: (queryId: string) => void,
    queryId: string
  }>
  private queryErrorListeners: Array<{
    listener: (queryId: string, error: string) => void,
    queryId: string
  }>
  constructor(opts: ApiOptions = DEFAULT_API_OPTIONS) {
    super(opts)
    this.pubsubQueryResultListeners = []
    this.queryDoneListeners = []
    this.queryErrorListeners = []
  }

  addPubsubQueryResultListener(
    listener: (queryId: string, message: string, messageId: string) => void,
    queryId: string,
    queryHandle: EventSource | ReadableStream<ArrayBuffer>
  ) {
    this.pubsubQueryResultListeners.push({
      listener,
      queryId
    })
    // For cancellation
    const isEventSubscription = new EventSubscription(
      () => {
        this.pubsubQueryResultListeners = this.pubsubQueryResultListeners.filter(
          (item) => item.queryId !== queryId
        )
        this.queryDoneListeners = this.queryDoneListeners.filter(
          (item) => item.queryId !== queryId
        )
        this.queryErrorListeners = this.queryErrorListeners.filter(
          (item) => item.queryId !== queryId
        )
        if (queryHandle instanceof EventSource) {
          queryHandle.close()
        }
      }
    )

    const onPubsubQueryEvent = (queryEvent: MobileQueryEvent) => {
      const message = queryEvent.data.value.values[0]
      const messageId = queryEvent.data.id
      for (const item of this.pubsubQueryResultListeners) {
        if (item.queryId === queryEvent.id) {
          item.listener(queryEvent.id, message, messageId)
        }
      }
    }

    const onQueryError = (e: Error) => {
      for (const item of this.queryErrorListeners) {
        if (item.queryId === queryId) {
          item.listener(queryId, e.toString())
        }
      }
    }

    const onQueryDone = () => {
      for (const item of this.queryDoneListeners) {
        if (item.queryId === queryId) {
          item.listener(queryId)
        }
      }

      this.pubsubQueryResultListeners = this.pubsubQueryResultListeners.filter(
        (item) => item.queryId !== queryId
      )
      this.queryDoneListeners = this.queryDoneListeners.filter(
        (item) => item.queryId !== queryId
      )
      this.queryErrorListeners = this.queryErrorListeners.filter(
        (item) => item.queryId !== queryId
      )
    }

    if (queryHandle instanceof EventSource) {
      queryHandle.addEventListener('update', (e: any) => {
        try {
          const queryEvent: MobileQueryEvent = JSON.parse(e.data)
          onPubsubQueryEvent(queryEvent)
        } catch (e) {
          onQueryError(e)
        }
      }, false)
      queryHandle.addEventListener('open', (e: any) => {
        // Connection was opened.
      }, false)
      queryHandle.addEventListener('error', (e: any) => {
        if (e.readyState === 2 /* EventSource.CLOSED */) {
          onQueryDone()
        } else {
          onQueryError(e)
        }
      }, false)
      return isEventSubscription
    } else {
      // For cancellation
      let isReader: any
      let cancellationRequest = false
      return new ReadableStream<ArrayBuffer>({
        start(controller) {
          const reader = queryHandle.getReader()
          isReader = reader
          const decoder = new TextDecoder()
          let dataBuffer = ''

          const processResult = (result: ReadableStreamReadResult<ArrayBuffer>) => {
            if (result.done) {
              if (cancellationRequest) {
                onQueryDone()
                return // Immediately exit
              }
              dataBuffer = dataBuffer.trim()
              if (dataBuffer.length !== 0) {
                try {
                  const queryEvent: MobileQueryEvent = JSON.parse(dataBuffer)
                  onPubsubQueryEvent(queryEvent)
                } catch (e) {
                  controller.error(e)
                }
              }
              onQueryDone()
              controller.close()
              return
            }
            const data = decoder.decode(result.value, { stream: true })
            dataBuffer += data
            const lines = dataBuffer.split('\n')
            for (const line of lines) {
              const l = line.trim()
              if (l.length > 0) {
                try {
                  const queryEvent: MobileQueryEvent = JSON.parse(l)
                  onPubsubQueryEvent(queryEvent)
                } catch (e) {
                  onQueryError(e)
                  controller.error(e)
                  break
                }
              }
            }
            dataBuffer = lines.length > 1 ? lines[lines.length - 1] : ''
            reader.read().then(processResult)
          }
          reader.read().then(processResult)
        },
        cancel(reason?: string) {
          isEventSubscription.cancel()
          cancellationRequest = true
          isReader.cancel(reason)
        }
      })
    }
  }

  addQueryDoneListener(
    listener: (queryId: string) => void,
    queryId: string
  ) {
    this.queryDoneListeners.push({
      listener,
      queryId
    })
    // For cancellation
    const isEventSubscription = new EventSubscription(
      () =>
        (this.queryDoneListeners = this.queryDoneListeners.filter(
          (item) => item.queryId !== queryId
        ))
    )
    return isEventSubscription
  }

  addQueryErrorListener(
    listener: (queryId: string, error: string) => void,
    queryId: string
  ) {
    this.queryErrorListeners.push({
      listener,
      queryId
    })
    // For cancellation
    const isEventSubscription = new EventSubscription(
      () =>
        (this.queryErrorListeners = this.queryErrorListeners.filter(
          (item) => item.queryId !== queryId
        ))
    )
    return isEventSubscription
  }
}
