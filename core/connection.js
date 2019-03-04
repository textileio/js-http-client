const axios = require("axios");
const { URL } = require("url");

/**
 * The connection module contains utilities for creating connections to a Textile node
 */
class Connection {
  /**
   * get() coerces the given options into a connection
   */
  static get(options) {
    const opts = Connection.cleanOpts(options);

    const url = new URL(opts.url);
    if (opts.port) {
      url.port = opts.port;
    }

    return axios.create({
      baseURL: url.toString()
    });
  }

  static cleanOpts(options) {
    const opts = options || {};
    opts.url = opts.url || "http://127.0.0.1";
    opts.port = opts.port || 40600;
    return opts;
  }
}

module.exports = Connection;
