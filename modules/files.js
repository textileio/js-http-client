const API = require("../core/api.js");

/**
 * Files is an API module for managing Textile files
 *
 * @param {ApiOptions} API options object
 * @extends {API}
 */
class Files extends API {
  constructor(opts) {
    super(opts);
    this.opts = opts;
  }

  /**
   * Get a paginated array of files.
   *
   * @param {object} [options] Options for pagination and filtering
   * @param {string} [options.thread] Limit to this thread ID
   * @param {string} [options.offset] Offset ID to start listing from. Omit for latest
   * @param {number} [options.limit=5] List page size
   */
  async get(options) {
    const { data } = await this.sendGet("api/v0/files", [], options);
    return data;
  }
}

module.exports = Files;
