import { API, DEFAULT_API_OPTIONS } from '../core/api'
import Config from './config'
import Files from './files'
import { Peer, ApiOptions } from '../models'

/**
 * Profile is an API module for accessing public profile information
 */
export default class Profile extends API {
  private config: Config
  private files: Files
  constructor(opts: ApiOptions = DEFAULT_API_OPTIONS) {
    super(opts)
    this.config = new Config(opts)
    this.files = new Files(opts)
  }

  /**
   * Retrieve the local node's public profile peer information
   * @returns The local node's peer information
   */
  async get() {
    const response = await this.sendGet('profile')
    return response.json() as Promise<Peer>
  }

  /**
   * Get the local node's public profile display name
   * @returns Node's public profile display name
   */
  async name() {
    const contact = await this.get()
    return contact.name
  }

  /**
   * Set the local node's public profile display name
   *
   * @param name Username string
   * @returns Whether the update was successful
   */
  async setName(name: string) {
    const response = await this.sendPost('profile/name', [name])
    return response.status === 201
  }

  /**
   * Get the local node's public profile avatar image hash
   * @returns Node's public profile avatar image hash
   */
  async avatar() {
    const contact = await this.get()
    return contact.avatar
  }

  /**
   * Forces local node to update avatar image to latest image added to 'account' thread
   *
   * @param image Image to use as new avatar. Can be any input type accepted by [[Files.add]].
   * @returns Whether the update was successful
   */
  async setAvatar(image: any) {
    const thread = await this.config.get('Account.Thread')
    await this.files.add(image, 'avatar', thread as string)
    const response = await this.sendPost('profile/avatar')
    return response.status === 201
  }
}
