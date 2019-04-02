import { API } from '../core/api'
import { ApiOptions, KeyValue } from '../models'

/**
 * Tokens is an API module for managing Cafe access tokens
 *
 * Tokens allow other peers to register with a Cafe peer. Use this API to create, list, validate,
 * and remove tokens required for access to this Cafe.
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class Tokens extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }

  /**
   * Creates an access token
   *
   * Generates an access token (44 random bytes) and saves a bcrypt hashed version for future
   * lookup. The response contains a base58 encoded version of the random bytes token. If the
   * ‘store’ option is set to false, the token is generated, but not stored in the local Cafe
   * db. Alternatively, an existing token can be added using by specifying the ‘token’ option.
   *
   * @param token Use an existing token, rather than creating a new one
   * @param store Whether to store the added/generated token to the local db (defaults to true)
   * @see Cafes#add
   * @returns New token as string
   */
  async create(token?: string, store?: boolean) {
    const response = await this.sendPost(`/api/v0/tokens`, undefined, {
      token: token || '',
      store: store || false
    })
    return response.data as string
  }

  /**
   * Check validity of existing cafe access token
   *
   * @param token Access token
   * @returns Whether token is valid
   */
  async validate(token: string) {
    const response = await this.sendGet(`/api/v0/tokens/${token}`)
    return response.status === 200
  }

  /**
   * Retrieves information about all stored cafe tokens
   *
   * Only really useful for debugging. These are hashed tokens, so are not valid.
   * @returns Array of bcrypt hashed tokens
   */
  async list() {
    const response = await this.sendGet('/api/v0/tokens')
    return response.data as string[]
  }

  /**
   * Removes an existing cafe token
   *
   * @param token Access token
   * @returns Whether remove was successful
   */
  async remove(token: string) {
    const response = await this.sendDelete(`/api/v0/tokens/${token}`)
    return response.status === 204
  }
}
