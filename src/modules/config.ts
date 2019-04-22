import { API } from '../core/api'
import { ApiOptions } from '../models'

/**
 * Config is an API module for controling peer node configuration variables
 *
 * It works much like 'git config'. The configuration values are stored in a config file
 * inside your Textile repository. Getting config values will report the currently active
 * config settings. This may differ from the values specifed when setting values.
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
   * @param path Config settings path (e.g., Addresses.API). Omit for full config file.
   * @returns A JSON representation of the current config setting at the given path
   */
  async get(path?: string) {
    const cleanPath = path ? `/${path.replace(/\./g, '/')}` : ''
    const response = await this.sendGet(`config${cleanPath}`)
    return response.json() as Promise<object>
  }

  /**
   * Replace or update config settings
   *
   * See https://tools.ietf.org/html/rfc6902 for details on RFC6902 JSON patch format.
   * Be sure to restart the daemon for changes to take effect.
   *
   * @param path Config settings path (e.g., Addresses.API).
   * @param value JSON config settings (can be any valid JSON type)
   * @returns Whether the operation was successfull
   */
  async set(path: string, value: any) {
    const cleanPath = `/${path.replace(/\./g, '/')}`
    const patch = [{ op: 'replace', path: cleanPath, value }]
    const response = await this.sendPatch(`config`, undefined, undefined, patch)
    return response.status === 204
  }
}
