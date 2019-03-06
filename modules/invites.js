const { API } = require("../core/api.js");

/**
 * Invites is an API module for managing thread invites
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Invites extends API {
  constructor(opts) {
    super(opts);
    this.opts = opts;
  }

  /**
   * Accept an invite to a thread
   *
   * @param {string} invite Invite ID
   * @param {string} key Key for an external invite
   */
  async accept(invite, key) {
    const response = await this.sendPost(
      `/api/v0/invites/${invite}/accept`,
      null,
      { key }
    );
    return response.data;
  }

  /**
   * Create a peer-to-peer or external invite to a thread
   *
   * @param {string} thread Thread ID (can also use ‘default’)
   * @param {string} [peer] Peer ID (omit to create an external invite)
   */
  async create(thread, peer) {
    const response = await this.sendPost(`/api/v0/invites/`, null, {
      thread,
      peer
    });
    return response.data;
  }

  /** Lists all pending thread invites */
  async list() {
    const response = await this.sendGet("/api/v0/invites");
    return response.data;
  }

  /**
   * Ignore a direct invite to a thread
   *
   * @param {string} id ID of the invite
   */
  async ignore(id) {
    this.sendPost(`/api/v0/invites/${id}/ignore`);
  }
}

module.exports = { Invites };
