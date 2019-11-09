import { API } from '../core/api'
import { readableNodeToWeb } from '../helpers/handlers'
import { MobileQueryEvent } from '../models'
import { ReadableStream } from 'web-streams-polyfill/ponyfill'
import KSUID from '@therebel/ksuid'

/**
 * IPFS is an API module for working with an underlying IPFS peer
 *
 * @extends API
 */
export default class IPFS extends API {
  /**
   * Retrieves underlying IPFS peer ID
   * @returns The underlying IPFS peer ID
   */
  async id() {
    const response = await this.sendGet(`ipfs/id`)
    return response.text() as Promise<string>
  }

  /**
   * Lists the set of peers to which this node is connected
   *
   * @param verbose Display all extra information
   * @param latency Also list information about latency to each peer
   * @param streams Also list information about open streams for each peer
   * @param direction Also list information about the direction of connection
   */
  async peers(verbose?: boolean, latency?: boolean, streams?: boolean, direction?: boolean) {
    const response = await this.sendGet(
      'ipfs/swarm/peers',
      undefined,
      {
        verbose: (!!verbose).toString(),
        latency: (!!latency).toString(),
        streams: (!!streams).toString(),
        direction: (!!direction).toString()
      }
    )
    return response.json()
  }

  /**
   * Retrieves the data behind an IPFS CID path
   *
   * @param path IPFS/IPNS CID path
   * @param key Key to decrypt the underlying data on-the-fly
   * @returns The underlying data behind the given IPFS CID path
   */
  async cat(path: string, key?: string) {
    const response = await this.sendGet(`ipfs/cat/${path}`, undefined, { key: key || '' })
    return response.blob()
  }

  /**
   * Opens a new direct connection to a peer using an IPFS multiaddr
   *
   * @param addr Peer IPFS multiaddr
   * @returns Whether the peer swarm connect was successfull
   */
  async connect(addr: string) {
    const response = await this.sendPost(`ipfs/swarm/connect`, [addr])
    return response.status === 200
  }

  /**
   * Publishes a message to a given pubsub topic
   *
   * @param topic The topic to publish to
   * @param data The payload of message to publish
   * @returns Whether the publish was successfull
   */
  async pubsubPub(topic: string, data: string | object) {
    const response = await this.sendPost(`ipfs/pubsub/pub/${topic}`, undefined, undefined, data, undefined, typeof data === 'string')
    return response.status === 200
  }

  /**
   * Subscribes to messages on a given topic with GET
   *
   * @param topic The ipfs pubsub sub topic
   * @returns A ReadableStream of ArrayBuffer
   */
  async pubsubSubGet(topic: string, queryId: string) {
    const response = await this.sendGet(`ipfs/pubsub/sub/${topic}`, undefined, { queryId })
    if (!response.body) {
      throw Error('Empty response stream')
    }
    return readableNodeToWeb<ArrayBuffer>(response.body as ReadableStream)
  }

  /**
   * Subscribes to messages on a given topic with EventSource or GET
   *
   * @param topic The ipfs pubsub sub topic
   * @param useEventSource Whether to use EventSource or GET
   * @returns An object with queryId and EventSource or a ReadableStream of ArrayBuffer
   */
  async pubsubSub(topic: string, useEventSource?: boolean) {
    const ksuidFromAsync = await KSUID.random()
    const queryId = ksuidFromAsync.string
    const queryHandle = useEventSource ? this.sendEventSource(`ipfs/pubsub/sub/${topic}`, undefined, { events: true, queryId }) : await this.pubsubSubGet(topic, queryId)
    return {
      queryId,
      queryHandle
    }
  }
}
