import { API } from '../core/api'
import { ApiOptions, KeyValue } from '../models'

/**
 * IPFS is an API module for working with an underlying IPFS peer
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class IPFS extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }

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
  async swarm(verbose?: boolean, latency?: boolean, streams?: boolean, direction?: boolean) {
    const response = await this.sendGet(
      'api/v0/ipfs/swarm/peers',
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
  async swarmConnect(addr: string) {
    const response = await this.sendGet(`ipfs/swarm/connect`, [addr])
    return response.status === 200
  }
}
