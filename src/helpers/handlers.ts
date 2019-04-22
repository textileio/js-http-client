import { Readable } from 'stream'
import { ReadableStream } from 'web-streams-polyfill/ponyfill'

// https://github.com/gwicke/node-web-streams
export const readableNodeToWeb = <T>(nodeStream: Readable | ReadableStream<T>) => {
  if (!(nodeStream instanceof Readable)) {
    return nodeStream
  }
  return new ReadableStream<T>({
    start(controller) {
      nodeStream.pause()
      nodeStream.on('data', (chunk: T) => {
        controller.enqueue(chunk)
        nodeStream.pause()
      })
      nodeStream.on('end', () => controller.close())
      nodeStream.on('error', (e: Error) => controller.error(e))
    },
    pull(_controller) {
      nodeStream.resume()
    },
    cancel(_reason) {
      nodeStream.pause()
    }
  })
}

export class NodeReadable<T> extends Readable {
  _webStream: ReadableStream
  _reader: ReadableStreamDefaultReader
  _reading: boolean
  constructor(webStream: ReadableStream<T>, options?: {}) {
    super(options)
    this._webStream = webStream
    this._reader = webStream.getReader()
    this._reading = false
  }

  _read(size: number) {
    if (this._reading) {
      return
    }
    this._reading = true
    const doRead = (size: number) => {
      this._reader.read()
        .then((res) => {
          if (res.done) {
            // tslint:disable-next-line:no-null-keyword
            this.push(null)
            return
          }
          if (this.push(res.value)) {
            return doRead(size)
          } else {
            this._reading = false
          }
        })
    }
    doRead(size)
  }
}

export const readableWebToNode = <T>(webStream: ReadableStream<T>) => {
  return new NodeReadable(webStream)
}

// https://github.com/canjs/can-ndjson-stream
export const streamHandler = <T>(response: ReadableStream<ArrayBuffer>) => {
  // For cancellation
  let isReader: any
  let cancellationRequest = false
  return new ReadableStream<T>({
    start(controller) {
      const reader = readableNodeToWeb(response).getReader()
      isReader = reader
      const decoder = new TextDecoder()
      let dataBuffer = ''

      const processResult = (result: ReadableStreamReadResult<ArrayBuffer>) => {
        if (result.done) {
          if (cancellationRequest) {
            return // Immediately exit
          }
          dataBuffer = dataBuffer.trim()
          if (dataBuffer.length !== 0) {
            try {
              const dataLine: T = JSON.parse(dataBuffer)
              controller.enqueue(dataLine)
            } catch (e) {
              controller.error(e)
              return
            }
          }
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
              controller.enqueue(JSON.parse(l))
            } catch (e) {
              controller.error(e)
              cancellationRequest = true
              reader.cancel(undefined)
              return
            }
          }
        }
        dataBuffer = lines.length > 1 ? lines[lines.length - 1] : ''
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
