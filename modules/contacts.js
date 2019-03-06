const { EventEmitter2 } = require("eventemitter2");
const { isCancel } = require("axios");
const { API } = require("../core/api.js");

/**
 * Contacts is an API module for managing local contacts and finding contacts on the network
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Contacts extends API {
  constructor(opts) {
    super(opts);
    this.opts = opts;
  }

  /**
   * Adds or updates a contact directly, usually from a search
   *
   * @param {object} contact JSON object representing a contact
   * @returns {Promise<string>} address
   * */
  async add(info) {
    const response = await this.sendPut(
      `/api/v0/contacts/${info.id}`,
      null,
      null,
      info
    );
    return response.data;
  }

  /**
   * Retrieve information about a known contact
   *
   * @param {string} contact ID of the contact
   */
  async get(contact) {
    const response = await this.sendGet(`/api/v0/contacts/${contact}`);
    return response.data;
  }

  /**
   * Retrieves a list of known contacts
   *
   * @param {string} thread ID of the thread
   */
  async list(thread) {
    const response = await this.sendGet("/api/v0/contacts", null, { thread });
    return response.data;
  }

  /**
   * Remove a known contact
   *
   * @param {string} contact ID of the contact
   */
  async remove(contact) {
    this.sendDelete(`/api/v0/contacts/${contact}`);
  }

  /**
   * Retrieve all threads shared with the given contact
   *
   * @param {string} contact ID of the contact
   */
  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  async threads(contact) {
    throw new ReferenceError("Not implemented");
  }

  /**
   * Searches locally and on the network for contacts by username, peer id, or address
   *
   * @param {Object} [options] Search options to send as headers
   * @param {string} [options.local] Whether to only search local contacts (default false)
   * @param {string} [options.limit] Stops searching after 'limit' results are found (defaut 5)
   * @param {string} [options.wait] Stops searching after ‘wait’ seconds have elapsed (max 10s, default 5s)
   * @param {string} [options.peer] Search by peer id string
   * @param {string} [options.username] Search by username string
   * @param {string} [options.address] Search by account address string
   * @returns {EventEmitter2} Event emitter with found, done, error events on textile.contacts.
   * The Event emitter has an additional cancel method that can be used to cancel the search.
   * @example
   * const backups = textile.account.search({wait: 5})
   * setTimeout(() => backups.cancel(), 1000) // cancel after 1 second
   * backups.on("textile.contacts.found", found => {
   *   console.log(found)
   * });
   * backups.on("*.done", cancelled => {
   *   console.log(`search was ${cancelled ? 'cancelled' : 'completed'}`)
   * });
   */
  search(options) {
    const { conn, cancel } = this.sendPostCancelable(
      "/api/v0/contacts/search",
      null,
      options
    );
    const emitter = new EventEmitter2({
      wildcard: true
    });
    emitter.cancel = cancel;
    conn
      .then(response => {
        const stream = response.data;
        stream.on("data", chunk => {
          emitter.emit("textile.contacts.found", chunk);
        });
        stream.on("end", () => {
          emitter.emit("textile.contacts.done", false);
        });
      })
      .catch(err => {
        if (isCancel(err)) {
          emitter.emit("textile.contacts.done", true);
        } else {
          emitter.emit("textile.contacts.error", err);
        }
      });
    return emitter;
  }
}

module.exports = { Contacts };
