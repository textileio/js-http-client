const API = require("../core/api.js");

/**
 * Blocks is an API module for managing Textile blocks
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Blocks extends API {
  constructor(opts) {
    super(opts);
    this.opts = opts;
  }

  /**
   * Add a comment onto a Textile block object
   *
   * @param {string} blockId ID of the block
   * @param {string} comment Comment to add
   * @param {options} [options] Extra options to pass in the headers
   */
  async addComment(blockId, comment, options) {
    const resp = await this.sendPost(
      `/api/v0/blocks/${blockId}/comments`,
      [comment],
      options
    );
    return resp.data;
  }
}

module.exports = Blocks;
