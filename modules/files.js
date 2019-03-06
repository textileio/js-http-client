const { API } = require("../core/api.js");
const { Mills } = require("./mills");
const { Threads } = require("./threads");
const { SchemaMiller } = require("../helpers/schema-miller");

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
    this.mills = new Mills(opts);
    this.threads = new Threads(opts);
  }

  /**
   * Retrieves a thread file by block ID
   *
   * @param {string} id ID of the target file
   */
  async get(id) {
    const response = await this.sendGet(`/api/v0/files/${id}`);
    return response.data;
  }

  /**
   * Get a paginated array of files.
   *
   * @param {object} [options] Options for pagination and filtering
   * @param {string} [options.thread] Thread ID (can also use ‘default’). Omit for all
   * @param {string} [options.offset] Offset ID to start listing from. Omit for latest
   * @param {number} [options.limit=5] List page size
   */
  async list(options) {
    const response = await this.sendGet("api/v0/files", null, options);
    return response.data;
  }

  /**
   * Retrieves file encryption/decryption keys under the given target
   *
   * Note that the target id is _not_ the same as the block id. The target is the actual target
   * file object.
   *
   * @param {string} target ID of the target file
   */
  async keys(target) {
    const response = await this.sendGet(`/api/v0/keys/${target}`);
    return response.data;
  }

  /**
   * Ignores a thread file by its block ID
   *
   * This adds an "ignore" thread block targeted at the file.
   * Ignored blocks are by default not returned when listing.
   *
   * @param {string} id ID of the thread file
   */
  async ignore(id) {
    this.sendDelete(`/api/v0/blocks/${id}`);
  }

  /**
   * Add a file to a thread in your Textile node
   *
   * @param {string} thread Id of the thread
   * @param {File} file A FormData object or a function for creating a FormData object
   * @param {string} caption Caption to add
   */
  async addFile(thread, file, caption) {
    if (!thread) {
      throw new Error(
        "'thread' must be provided when adding files to a thread"
      );
    }

    // Make sure we have a schema
    const opts = { caption };
    opts.schema_node = (await this.threads.get(thread)).schema_node;

    // Mill the file(s) before adding it
    const files = await SchemaMiller.mill(
      file,
      // TODO: This won't always have links
      opts.schema_node.links,
      async (link, form, headers) => {
        const { data: res } = await this.mills.run(
          link.mill,
          link.opts,
          form,
          headers
        );
        res.name = link.name;
        return res;
      }
    );

    const resp = await this.sendPost(
      `api/v0/threads/${thread}/files`,
      null,
      opts,
      // TODO: Create proper DirectoryList and Directory object definitions
      { items: [{ files }] }
      // { "Content-Type": "application/json" }
    );
    return resp.data;
  }
}

module.exports = { Files };
