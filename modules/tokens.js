const { API } = require("../core/api.js");

/**
 * Tokens is an API module for managing Cafe access tokens
 *
 * Tokens allow other peers to register with a Cafe peer. Use this API to create, list, validate,
 * and remove tokens required for access to this Cafe.
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Tokens extends API {
  constructor(opts) {
    super(opts);
    this.opts = opts;
  }

  /**
   * Creates an access token
   *
   * Generates an access token (44 random bytes) and saves a bcrypt hashed version for future
   * lookup. The response contains a base58 encoded version of the random bytes token. If the
   * ‘store’ option is set to false, the token is generated, but not stored in the local Cafe
   * db. Alternatively, an existing token can be added using by specifying the ‘token’ option.
   *
   * @param {object} [options] Options for creating tokens
   * @param {string} [options.token] Use an existing token, rather than creating a new one
   * @param {boolean} [options.store] Whether to store the added/generated token to the local db
   * @see Cafes#add
   */
  async create(options) {
    const response = await this.sendPost(`/api/v0/tokens/`, null, options);
    return response.data;
  }

  /**
   * Check validity of existing cafe access token
   *
   * @param {string} token Access token
   */
  async validate(token) {
    const response = await this.sendGet(`/api/v0/tokens/${token}`);
    return response.data;
  }

  /** Retrieves information about all stored cafe tokens */
  async list() {
    const response = await this.sendGet("/api/v0/tokens");
    return response.data;
  }

  /**
   * Removes an existing cafe token
   *
   * @param {string} token Access token
   */
  async remove(token) {
    this.sendDelete(`/api/v0/tokens/${token}`);
  }
}

module.exports = { Tokens };
