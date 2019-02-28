const API = require("../core/api.js");

// Schema endpoint does not currently exist, so hardcoding this for now
const knownSchemas = [
  {
    id: "QmX3ugbr1i4hxJYLpJtMNpgyNG4FaF7hhmNNvX8ahSeXGH",
    name: "media",
    pin: true,
    plaintext: false
  }
];

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

  /** Retrieves a list of known schemas */
  // eslint-disable-next-line class-methods-use-this
  async get() {
    return knownSchemas; // TODO Not implemented in textile-go yet
    // return this.con().get("/api/v0/schemas");
  }

  /**
   * Retrieves a schema for a given name
   *
   * @param {string} name Name of the schema to retrieve
   */
  async getByName(name) {
    const schemas = await this.get();
    for (let i = 0; i < schemas.length; i += 1) {
      const schema = schemas[i];
      if (schema.name.toUpperCase() === name.toUpperCase()) {
        return schema;
      }
    }
    return null;
  }
}

module.exports = Schemas;
