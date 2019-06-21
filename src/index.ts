import Account from './modules/account'
import Blocks from './modules/blocks'
import Cafes from './modules/cafes'
import Config from './modules/config'
import Comments from './modules/comments'
import Contacts from './modules/contacts'
import Feed from './modules/feed'
import File from './modules/file'
import Files from './modules/files'
import Invites from './modules/invites'
import IPFS from './modules/ipfs'
import Likes from './modules/likes'
import Logs from './modules/logs'
import Messages from './modules/messages'
import Notifications from './modules/notifications'
import Profile from './modules/profile'
import Schemas from './modules/schemas'
import Observe from './modules/observe'
import Threads from './modules/threads'
import Tokens from './modules/tokens'
import Utils from './modules/utils'
import { TextileOptions } from './models'
import { DEFAULT_API_OPTIONS as defaults } from './core/api'
export * from './models'

/**
 * Textile is the main client class
 */
export class Textile {
  /**
   * Returns a new instance of Textile
   *
   * @param [options] Textile TextileOptions object
   */
  static create(options?: TextileOptions) {
    return new this(options)
  }
  /** @property {Account} account - Manage Textile node account */
  account: Account
  /** @property {Blocks} blocks - Manage Textile Blocks */
  blocks: Blocks
  /** @property {Cafes} account - Manage Textile Cafes */
  cafes: Cafes
  /** @property {Config} config - Manage Textile Config settings */
  config: Config
  /** @property {Comments} comments - Manage Textile block Comments */
  comments: Comments
  /** @property {Contacts} contacts - Manage Textile peer Contacts */
  contacts: Contacts
  /** @property {Feed} feed - Manage the Textile Feed */
  feed: Feed
  /** @property {File} file - Manage a Textile File */
  file: File
  /** @property {Files} files - Manage Textile Files */
  files: Files
  /** @property {Invites} invites - Manage Textile Invites */
  invites: Invites
  /** @property {IPFS} ipfs - Manage the underlying IPFS peer */
  ipfs: IPFS
  /** @property {Likes} likes - Manage Textile block Likes */
  likes: Likes
  /** @property {Logs} logs - Manage Textile subsystem logs */
  logs: Logs
  /** @property {Messages} messages - Manage Textile thread Messages */
  messages: Messages
  /** @property {Notifications} notifications - Manage Textile Notifications */
  notifications: Notifications
  /** @property {Profile} profile - Manage a Textile node's public profile */
  profile: Profile
  /** @property {Schemas} schemas - Manage Textile Schemas */
  schemas: Schemas
  /** @property {Observe} observe - Observe (real-time) thread updates */
  observe: Observe
  /** @property {Threads} threads - Manage Textile Threads */
  threads: Threads
  /** @property {Tokens} tokens - Manage Textile Threads */
  tokens: Tokens
  /** @property {Utils} utils - Get information about the Textile node */
  utils: Utils
  constructor(options?: TextileOptions) {
    const _options = defaults
    if (options && options.port !== undefined) {
      _options.port = options.port
    }
    if (options && options.url !== undefined) {
      _options.url = options.url
    }
    if (options && options.version !== undefined) {
      _options.version = options.version
    }
    this.account = new Account(_options)
    this.blocks = new Blocks(_options)
    this.cafes = new Cafes(_options)
    this.config = new Config(_options)
    this.comments = new Comments(_options)
    this.contacts = new Contacts(_options)
    this.feed = new Feed(_options)
    this.file = new File(_options)
    this.files = new Files(_options)
    this.invites = new Invites(_options)
    this.ipfs = new IPFS(_options)
    this.likes = new Likes(_options)
    this.logs = new Logs(_options)
    this.messages = new Messages(_options)
    this.notifications = new Notifications(_options)
    this.profile = new Profile(_options)
    this.schemas = new Schemas(_options)
    this.observe = new Observe(_options)
    this.threads = new Threads(_options)
    this.tokens = new Tokens(_options)
    this.utils = new Utils(_options)
  }
}

export default new Textile()
