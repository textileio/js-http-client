const API = require("../core/api.js");

/**
 * Mills is an API module for processing Textile mills
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Mills extends API {
  constructor(opts) {
    super(opts);
    this.opts = opts;
  }

  /*
   * Run a mill over a given payload
   *
   * @param {string} name Name of the mill. (Relative uri)
   * @param {object} options Schema options for the mill
   * @param {object} payload A multi-part form containing the payload
   * @param {object} [headers] Extra headers to send in the request
   */
  async run(name, options, payload, headers) {
    return this.sendPostMultiPart(
      `api/v0/mills${name}`,
      [],
      options,
      payload,
      headers
    );
  }
}

module.exports = Mills;
