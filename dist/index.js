"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Main module
const account_1 = __importDefault(require("./modules/account"));
const cafes_1 = __importDefault(require("./modules/cafes"));
const config_1 = __importDefault(require("./modules/config"));
const comments_1 = __importDefault(require("./modules/comments"));
const contacts_1 = __importDefault(require("./modules/contacts"));
const feed_1 = __importDefault(require("./modules/feed"));
const files_1 = __importDefault(require("./modules/files"));
const invites_1 = __importDefault(require("./modules/invites"));
const ipfs_1 = __importDefault(require("./modules/ipfs"));
const likes_1 = __importDefault(require("./modules/likes"));
const logs_1 = __importDefault(require("./modules/logs"));
const messages_1 = __importDefault(require("./modules/messages"));
const notifications_1 = __importDefault(require("./modules/notifications"));
const profile_1 = __importDefault(require("./modules/profile"));
const schemas_1 = __importDefault(require("./modules/schemas"));
const threads_1 = __importDefault(require("./modules/threads"));
const tokens_1 = __importDefault(require("./modules/tokens"));
const utils_1 = __importDefault(require("./modules/utils"));
const wallet_1 = __importDefault(require("./modules/wallet"));
/**
 * Textile is the main client class
 *
 * @param {ApiOptions} options The API options object
 */
class Textile {
    constructor(options) {
        this.opts = options || {};
        this.account = new account_1.default(this.opts);
        this.cafes = new cafes_1.default(this.opts);
        this.config = new config_1.default(this.opts);
        this.comments = new comments_1.default(this.opts);
        this.contacts = new contacts_1.default(this.opts);
        this.feed = new feed_1.default(this.opts);
        this.files = new files_1.default(this.opts);
        this.invites = new invites_1.default(this.opts);
        this.ipfs = new ipfs_1.default(this.opts);
        this.likes = new likes_1.default(this.opts);
        this.logs = new logs_1.default(this.opts);
        this.messages = new messages_1.default(this.opts);
        this.notifications = new notifications_1.default(this.opts);
        this.profile = new profile_1.default(this.opts);
        this.schemas = new schemas_1.default(this.opts);
        this.threads = new threads_1.default(this.opts);
        this.tokens = new tokens_1.default(this.opts);
        this.utils = new utils_1.default(this.opts);
    }
}
module.exports = { Textile, Wallet: wallet_1.default };
