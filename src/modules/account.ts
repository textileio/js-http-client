import { API, DEFAULT_API_OPTIONS } from '../core/api'
import { ApiOptions, Contact } from '../models'
import Snapshots from './snapshots'

/**
 * Account is an API module for managing a node account
 *
 * @extends API
 */
export default class Account extends API {
  private snapshots: Snapshots
  constructor(opts: ApiOptions = DEFAULT_API_OPTIONS) {
    super(opts)
    this.snapshots = new Snapshots(opts)
  }

  /**
   * Retrieve the local node account address
   *
   * @returns The current node account's address
   */
  async address() {
    const response = await this.sendGet('account/address')
    return response.text()
  }

  /**
   * Retrieve the local node account seed
   *
   * @returns The current node account's seed
   */
  async seed() {
    const response = await this.sendGet('account/seed')
    return response.text()
  }

  /**
   * Retrieve the local node account's own contact info
   *
   * @returns The current node account's contact info
   */
  async contact(): Promise<Contact> {
    const response = await this.sendGet('account')
    return response.json()
  }

  /**
   * Syncs the local node account with all thread snapshots found on the network
   *
   * @param apply Whether to apply the discovered thread snapshots as they are found (default false)
   * @param wait Stops searching after 'wait' seconds have elapsed (max 30 default 2)
   * @returns An event emmiter for snapshot search events
   */
  sync(apply?: boolean, wait?: number) {
    if (apply) {
      return this.snapshots.apply(undefined, wait)
    }
    return this.snapshots.search(wait)
  }
}
