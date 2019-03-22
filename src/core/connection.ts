import axios from 'axios'
import { URL } from 'url'
import { ApiOptions } from '../models'

/**
 * The connection module contains utilities for creating connections to a Textile node
 */
export default class Connection {
  /**
   * get() coerces the given options into a connection
   */
  static get(options: ApiOptions) {
    const opts = Connection.cleanOpts(options)

    const url = new URL(opts.url)
    if (opts.port) {
      url.port = opts.port
    }

    return axios.create({
      baseURL: url.toString()
    })
  }

  static cleanOpts(options: ApiOptions) {
    const opts = options || {}
    opts.url = opts.url || 'http://127.0.0.1'
    opts.port = opts.port || '40600'
    return opts
  }
}
