const { API } = require("../core/api.js");

/**
 * IPFS is an API module for working with an underlying IPFS peer
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class IPFS extends API {
  constructor(opts) {
    super(opts);
    this.opts = opts;
  }

  /** Retrieves underlying IPFS peer ID */
  async peerId() {
    const response = await this.sendGet(`/api/v0/ipfs/id`);
    return response.data;
  }

  /**
   * Lists the set of peers to which this node is connected
   *
   * @param {object} [options] Options for listing swarm peers
   * @param {boolean} [options.verbose=false] Display all extra information
   * @param {boolean} [options.latency=false] Also list information about latency to each peer
   * @param {boolean} [options.streams=false] Also list information about open streams for each peer
   * @param {boolean} [options.direction=false] Also list information about the direction of connection
   */
  async swarmPeers(options) {
    const { data } = await this.sendGet(
      "api/v0/ipfs/swarm/peers",
      null,
      options
    );
    return data;
  }

  /**
   * Retrieves the data behind an IPFS CID (hash)
   *
   * @param {string} cid IPFS/IPNS content ID
   * @param {string} [key] Key to decrypt the underlying data on-the-fly
   */
  async cat(cid, key) {
    const response = await this.sendGet(`/api/v0/ipfs/cat/${cid}`, null, {
      key
    });
    return response.data;
  }

  /**
   * Opens a new direct connection to a peer using an IPFS multiaddr
   *
   * @param {string} addr Peer IPFS multiaddr
   */
  async swarmConnect(addr) {
    const response = await this.sendGet(`/api/v0/ipfs/swarm/connect`, [addr]);
    return response.data;
  }
}

module.exports = { IPFS };
