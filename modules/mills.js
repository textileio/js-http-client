const { API } = require("../core/api.js");

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

  /**
   * Run a mill over a given payload
   *
   * Currently supports:
   * * `/blob` - Process raw data blobs
   * * `/image/exif` - Extract EXIF data from an image
   * * `/image/resize` - Resize an image
   * * `/json` - Process (and validate according to schema.org definition) input JSON data
   * * `/schema` - Validate, add, and pin a new JSON-based Schema
   *
   * @param {string} name Name of the mill. (Relative uri). See above description
   * for details
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

module.exports = { Mills };
