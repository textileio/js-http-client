import { API } from '../core/api'
import { ApiOptions, KeyValue } from '../models'

/**
 * Config is an API module for controling peer node configuration variables
 *
 * It works much like 'git config'. The configuration values are stored in a config file
 * inside your Textile repository.
 * Getting config values will report the currently active config settings. This may differ from
 * the values specifed when setting values.
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class Config extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
  }

  /**
   * Report the currently active config settings
   *
   * The reported settings may differ from the values specifed when setting/patching values.
   *
   * @param {string} [path] Config settings path (e.g., Addresses.API). Omit for full config file.
   */
  async get(path: string) {
    const cleanPath = path ? `/${path.replace(/\./g, ' ')}` : ''
    const response = await this.sendGet(`api/v0/config${cleanPath}`)
    return response.data
  }

  /**
   * Replace or update config settings
   *
   * See https://tools.ietf.org/html/rfc6902 for details on RFC6902 JSON patch format.
   * Be sure to restart the daemon for changes to take effect.
   *
   * @param {string} path Config settings path (e.g., Addresses.API).
   * @param {object} value JSON config settings
   */
  async set(path: string, value: KeyValue) {
    // TODO: redo with typing
    throw new ReferenceError('Not implemented')
    // const cleanPath = path ? `/${path.replace(/\./g, ' ')}` : ''
    // const patch = [{ op: 'replace', path: cleanPath, value }]
    // this.sendPatch(
    //   `api/v0/config`,
    //   undefined,
    //   undefined,
    //   patch
    // )
  }
}
