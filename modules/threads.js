const { EventEmitter2 } = require("eventemitter2");
const FormData = require("form-data");
const API = require("../core/api.js");
const Mill = require("./mills");
const SchemaMiller = require("../helpers/schema-miller");

/**
 * Threads is an API module for managing Textile threads
 *
 * @param {Object} opts Connection options object
 * @param {string} opts.url
 * @extends API
 */
class Threads extends API {
  constructor(opts) {
    super(opts);
    this.opts = opts;
    this.events = new EventEmitter2();
    this.mill = new Mill(opts);
  }

  /** Retrieves a list of threads */
  async get() {
    const threads = await this.sendGet("/api/v0/threads");
    return threads.data;
  }

  /**
   * Retrieves a thread by its name
   *
   * @param {string} name Name of the thread to find
   */
  async getByName(name) {
    const threads = await this.get();
    for (let i = 0; i < threads.length; i += 1) {
      const thrd = threads[i];
      if (thrd.name.toUpperCase() === name.toUpperCase()) {
        return thrd;
      }
    }
    return null;
  }

  /**
   * Retrieve a thread by ID
   *
   * @param {string} threadId ID of the thread
   */
  async getById(threadId) {
    const thread = await this.sendGet(`/api/v0/threads/${threadId}`);
    return thread.data;
  }
  //
  //   /**
  //    * Retrieve a threads peers TODO
  //    */
  //   async getPeers(threadId) {}

  /**
   * Add a new thread to your Textile node
   *
   * @param {string} name The name of the new thread
   * @param {Object} options Additional options to send as headers
   * @param {string} options.schema Schema ID for the new thread
   * @param {string} options.sharing Sharing type for the new thread
   * @example
   * await textile.thread.add("MyMedia", {
   *   schema: mediaSchema.id,
   *   type: "open",
   *   sharing: "shared"
   * })
   */
  async add(name, options) {
    const added = await this.sendPost("/api/v0/threads", [name], options);
    return added.data;
  }

  //   /**
  //    * Add or update a thread in your Textile node TODO
  //    */
  //   async addOrUpdate(threadId, options) {}
  //
  //   /**
  //    * Add messages to a thread in your Textile node TODO
  //    */
  //   async addMessages(threadId, msgs) {}

  /**
   * Add a file to a thread in your Textile node
   *
   * @param {string} threadId Id of the thread
   * @param {object} fileStream Nodejs file stream
   * @param {string} fileName Name of the file in the stream
   * @param {object} options Options object
   * @param {string} options.schema Id of the schema to use for the mill
   * @param {string} options.caption Caption to add to the image
   */
  async addFileStream(threadId, fileStream, fileName, options) {
    const form = new FormData();
    form.append("file", fileStream, fileName);

    const headers = form.getHeaders();

    return this.addFile(threadId, form, options, headers);
  }

  /**
   * Add a file to a thread in your Textile node
   *
   * @param {string} threadId Id of the thread
   * @param {File} file FormData object
   * @param {object} options Options object
   * @param {string} options.schema Schema object to use for the mill
   * @param {string} options.caption Caption to add to the image
   * @param {object} [headers] Extra headers to send in the request
   */
  async addFile(threadId, file, options, headers) {
    if (!threadId) {
      throw new Error(
        "'threadId' must be provided when adding files to a thread"
      );
    }

    // Make sure we have a schema
    const opts = options || {};
    if (!opts.schema) {
      opts.schema = (await this.getById(threadId)).schema;
    }

    // Mill the file before adding it
    const milled = await SchemaMiller.mill(
      file,
      opts.schema.links,
      async link => {
        const { data: res } = await this.mill.run(
          link.mill,
          link.opts,
          file,
          headers
        );
        res.name = link.name;
        return res;
      }
    );

    const resp = await this.sendPost(
      `api/v0/threads/${threadId}/files`,
      [],
      opts,
      [milled]
    );
    return resp.data;
  }
}

module.exports = Threads;
