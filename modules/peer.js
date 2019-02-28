const API = require("../core/api.js");

/**
 * Peer is an API module for getting basic information about a Textile node
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Peer extends API {
  constructor(opts) {
    super(opts);
    this.opts = opts;
  }

  /** Retrieve the peer ID of the Textile node */
  async get() {
    const { data } = await this.sendGet("/api/v0/peer");
    return data;
  }

  /** Retrieves the address of the Textile node */
  async address() {
    const { data } = await this.sendGet("/api/v0/address");
    return data;
  }
}

module.exports = Peer;
