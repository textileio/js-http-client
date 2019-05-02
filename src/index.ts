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
import Subscribe from './modules/subscribe'
import Threads from './modules/threads'
import Tokens from './modules/tokens'
import Utils from './modules/utils'
import { ApiOptions } from './models'
export { default as Wallet } from './modules/wallet'
export * from './models'

/**
 * Textile is the main client class
 *
 * @param {ApiOptions} options The API options object
 */
export class Textile {
  opts: ApiOptions
  /** @property {Account} account - Manage Textile wallet account */
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
  /** @property {Subscribe} subscribe - Subscribe to thread updates */
  subscribe: Subscribe
  /** @property {Threads} threads - Manage Textile Threads */
  threads: Threads
  /** @property {Tokens} tokens - Manage Textile Threads */
  tokens: Tokens
  /** @property {Utils} utils - Get information about the Textile node */
  utils: Utils
  constructor(options: ApiOptions) {
    this.opts = options || {}
    this.account = new Account(this.opts)
    this.blocks = new Blocks(this.opts)
    this.cafes = new Cafes(this.opts)
    this.config = new Config(this.opts)
    this.comments = new Comments(this.opts)
    this.contacts = new Contacts(this.opts)
    this.feed = new Feed(this.opts)
    this.file = new File(this.opts)
    this.files = new Files(this.opts)
    this.invites = new Invites(this.opts)
    this.ipfs = new IPFS(this.opts)
    this.likes = new Likes(this.opts)
    this.logs = new Logs(this.opts)
    this.messages = new Messages(this.opts)
    this.notifications = new Notifications(this.opts)
    this.profile = new Profile(this.opts)
    this.schemas = new Schemas(this.opts)
    this.subscribe = new Subscribe(this.opts)
    this.threads = new Threads(this.opts)
    this.tokens = new Tokens(this.opts)
    this.utils = new Utils(this.opts)
  }
}

export default Textile
