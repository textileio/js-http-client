import { API } from '../core/api'
import { ApiOptions, Contact, QueryResult } from '../models'
import Snapshots from './snapshots'

/**
 * Account is an API module for managing a wallet account
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class Account extends API {
  opts: ApiOptions
  private snapshots: Snapshots
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
    this.snapshots = new Snapshots(opts)
  }

  /**
   * Retrieve the local wallet account address
   *
   * @returns The current wallet account's address
   */
  async address() {
    const response = await this.sendGet('account/address')
    return response.text()
  }

  /**
   * Retrieve the local wallet account seed
   *
   * @returns The current wallet account's seed
   */
  async seed() {
    const response = await this.sendGet('account/seed')
    return response.text()
  }

  /**
   * Retrieve the local wallet account's own contact info
   *
   * @returns The current wallet account's contact info
   */
  async contact(): Promise<Contact> {
    const response = await this.sendGet('account/contact')
    return response.json()
  }

  /**
   * Syncs the local wallet account with all thread snapshots found on the network
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
