const { API } = require("../../core/api.js");
const defaults = require("./defaults");

/**
 * Schemas is an API module for managing Textile schemas
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Schemas extends API {
  constructor(opts) {
    super(opts);
    this.opts = opts;
  }

  /* eslint-disable class-methods-use-this */
  /** Default Textile schemas */
  async defaults() {
    return defaults;
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Creates and validates a new schema from input JSON
   *
   * @param {object} schema Input JSON-based thread schema
   */
  async add(schema) {
    const response = await this.sendPost(
      `/api/v0/mills/schema`,
      null,
      null,
      schema,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  /**
   * Retrieves a schema by thread ID
   *
   * @param {string} thread ID of the thread
   */
  async get(thread) {
    const response = await this.sendGet(`/api/v0/threads/${thread}`);
    return response.data.schema_node;
  }
}

module.exports = { Schemas };
