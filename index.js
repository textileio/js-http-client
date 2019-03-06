// Main modules
const { Account } = require("./modules/account");
const { Cafes } = require("./modules/cafes");
const { Config } = require("./modules/config");
const { Comments } = require("./modules/comments");
const { Contacts } = require("./modules/contacts");
const { Feed } = require("./modules/feed");
const { Files } = require("./modules/files");
const { Invites } = require("./modules/invites");
const { IPFS } = require("./modules/ipfs");
const { Likes } = require("./modules/likes");
const { Logs } = require("./modules/logs");
const { Messages } = require("./modules/messages");
const { Notifications } = require("./modules/notifications");
const { Profile } = require("./modules/profile");
const { Schemas } = require("./modules/schemas");
const { Threads } = require("./modules/threads");
const { Tokens } = require("./modules/tokens");
const { Utils } = require("./modules/utils");
const { Wallet } = require("./modules/wallet");

// **** Definitions
/**
 * The options object for the client object
 * @typedef {Object} ApiOptions
 * @property {string} [url="http://127.0.0.1"] - The base URL of the Textile node API
 * @property {number} [port=40600] - The port of the Textile node API
 */

/**
 * Textile is the main client class
 *
 * @param {ApiOptions} options The API options object
 */
class Textile {
  constructor(options) {
    this.opts = options || {};

    /** @property {Account} account - Manage Textile wallet account */
    this.account = new Account(this.opts);
    /** @property {Cafes} account - Manage Textile Cafes */
    this.cafes = new Cafes(this.opts);
    /** @property {Config} config - Manage Textile Config settings */
    this.config = new Config(this.opts);
    /** @property {Comments} comments - Manage Textile block Comments */
    this.comments = new Comments(this.opts);
    /** @property {Contacts} contacts - Manage Textile peer Contacts */
    this.contacts = new Contacts(this.opts);
    /** @property {Feed} feed - Manage the Textile Feed */
    this.feed = new Feed(this.opts);
    /** @property {Files} files - Manage Textile Files */
    this.files = new Files(this.opts);
    /** @property {Invites} invites - Manage Textile Invites */
    this.invites = new Invites(this.opts);
    /** @property {IPFS} ipfs - Manage the underlying IPFS peer */
    this.ipfs = new IPFS(this.opts);
    /** @property {Likes} likes - Manage Textile block Likes */
    this.likes = new Likes(this.opts);
    /** @property {Logs} logs - Manage Textile subsystem logs */
    this.logs = new Logs(this.opts);
    /** @property {Messages} messages - Manage Textile thread Messages */
    this.messages = new Messages(this.opts);
    /** @property {Notifications} notifications - Manage Textile Notifications */
    this.notifications = new Notifications(this.opts);
    /** @property {Profile} profile - Manage a Textile node's public profile */
    this.profile = new Profile(this.opts);
    /** @property {Schemas} schemas - Manage Textile Schemas */
    this.schemas = new Schemas(this.opts);
    /** @property {Threads} threads - Manage Textile Threads */
    this.threads = new Threads(this.opts);
    /** @property {Tokens} tokens - Manage Textile Threads */
    this.tokens = new Tokens(this.opts);
    /** @property {Utils} utils - Get information about the Textile node */
    this.utils = new Utils(this.opts);
  }
}

module.exports = { Textile, Wallet };
