// Main modules
const Peer = require("./modules/peer");
// const Profile = require('./modules/profile'),
// const Mills = require('./modules/mills'),
const Schemas = require("./modules/schemas");
const Threads = require("./modules/threads");
const Blocks = require("./modules/blocks");
// const Messages = require('./modules/messages'),
const Files = require("./modules/files");
// const Keys = require('./modules/keys'),
// const Sub = require('./modules/sub'),
// const Invites = require('./modules/invites'),
// const Notifications = require('./modules/notifications'),
// const Cafes = require('./modules/cafes'),
// const Swarm = require('./modules/swarm'),
// const Contacts = require('./modules/contacts'),
// const IPFS = require('./modules/ipfs'),
// const Confg = require('./modules/config'),

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

    /** @property {Peer} peer - Manage Textile node information */
    this.peer = new Peer(this.opts);
    /** @property {Schema} schemas - Manage Textile schema definitions */
    this.schemas = new Schemas(this.opts);
    /** @property {Thread} threads - Manage Textile thread objects */
    this.threads = new Threads(this.opts);
    /** @property {Block} blocks - Manage Textile block objects */
    this.blocks = new Blocks(this.opts);
    /** @property {File} files - Manage existing files in a Textile node */
    this.files = new Files(this.opts);
  }
}

module.exports = Textile;
