import { fetch, Headers } from '@softwareventures/fetch-ponyfill-preconfigured'
import FormData from 'isomorphic-form-data'
import URL from 'url-parse'
import { buildAbsoluteURL } from 'url-toolkit'
import { KeyValue, ApiOptions } from '../models'

export const DEFAULT_API_OPTIONS = {
  url: 'http://127.0.0.1',
  port: 40600,
  version: 0
}

/**
 * Create 'args' like a CLI command would take
 *
 * @param {string[]} argsAr An array of arguments
 * @private
 */
export const getArgs = (argsAr?: string[]) => {
  if (!argsAr || !argsAr.length) {
    return ''
  }
  return argsAr.map((ar) => encodeValue(ar)).join(',')
}

/**
 * Create 'options' like a CLI command would take.
 *
 * @param {Object.<string, string>} opts A map of option keys and values
 * @private
 */
export const getOpts = (opts?: KeyValue) => {
  if (!opts) {
    return ''
  }
  return Object.keys(opts)
    .map((key) => `${key}=${encodeValue(opts[key])}`)
    .join(',')
}

const encodeValue = (val: string | number | boolean) => {
  return encodeURIComponent(val.toString())
}

export const createHeaders = (args?: string[], opts?: KeyValue, headers?: KeyValue): Record<string, string> => {
  const h = headers || {}
  return {
    ...h,
    'X-Textile-Args': getArgs(args),
    'X-Textile-Opts': getOpts(opts)
  }
}

const handleErrors = (response: Response) => {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

/**
 * API is the base class for all SDK modules.
 *
 * @params {ApiOptions] opts API options object
 */
class API {
  private opts: ApiOptions
  private baseURL: string
  private gatewayURL: string
  constructor(opts: ApiOptions = DEFAULT_API_OPTIONS) {
    this.opts = opts
    const url = new URL(opts.url)
    if (opts.port) {
      url.set('port', opts.port)
    }
    url.set('pathname', `/api/v${opts.version || 0}/`)
    this.baseURL = url.toString()

    const gateway = new URL(this.opts.url)
    gateway.set('port', 5050)
    gateway.set('pathname', `/ipfs/`)
    this.gatewayURL = gateway.toString()
  }

  /**
   * Make a get request to the Textile node
   *
   * @param url The relative URL of the API endpoint
   * @param args An array of arguments to pass as Textile args headers
   * @param opts An object of options to pass as Textile options headers
   */
  protected async sendGatewayGet(path: string, headers?: KeyValue) {
    return fetch(buildAbsoluteURL(this.gatewayURL, path), {
      method: 'GET',
      headers: createHeaders([], {}, headers)
    })
  }

  /**
   * Make a post request to the Textile node
   *
   * @param url The relative URL of the API endpoint
   * @param args An array of arguments to pass as Textile args headers
   * @param opts An object of options to pass as Textile options headers
   * @param data An object of data to post
   */
  protected async sendPost(url: string, args?: string[], opts?: KeyValue, data?: any, headers?: KeyValue, raw?: boolean) {
    const h = createHeaders(args, opts, headers)
    const response = await fetch(buildAbsoluteURL(this.baseURL, url), {
      method: 'POST',
      headers: new Headers(h),
      body: raw ? data : JSON.stringify(data)
    })
    return handleErrors(response)
  }

  /**
   * Make a get request to the Textile node
   *
   * @param url The relative URL of the API endpoint
   * @param args An array of arguments to pass as Textile args headers
   * @param opts An object of options to pass as Textile options headers
   */
  protected async sendGet(url: string, args?: string[], opts?: KeyValue, headers?: KeyValue) {
    const response = await fetch(buildAbsoluteURL(this.baseURL, url), {
      method: 'GET',
      headers: createHeaders(args, opts, headers)
    })
    return handleErrors(response)
  }

  /**
   * Make a delete request to the Textile node
   *
   * @param url The relative URL of the API endpoint
   * @param args An array of arguments to pass as Textile args headers
   * @param opts An object of options to pass as Textile options headers
   */
  protected async sendDelete(url: string, args?: string[], opts?: KeyValue, headers?: KeyValue) {
    const response = await fetch(buildAbsoluteURL(this.baseURL, url), {
      method: 'DELETE',
      headers: createHeaders(args, opts, headers)
    })
    return handleErrors(response)
  }

  /**
   * Make a put request to the Textile node
   *
   * @param url The relative URL of the API endpoint
   * @param args An array of arguments to pass as Textile args headers
   * @param opts An object of options to pass as Textile options headers
   * @param data An object of data to put
   */
  protected async sendPut(url: string, args?: string[], opts?: KeyValue, data?: any, headers?: KeyValue) {
    const response = await fetch(buildAbsoluteURL(this.baseURL, url), {
      method: 'PUT',
      headers: createHeaders(args, opts, headers),
      body: JSON.stringify(data)
    })
    return handleErrors(response)
  }

  /**
   * Make a patch request to the Textile node
   *
   * @param url The relative URL of the API endpoint
   * @param args An array of arguments to pass as Textile args headers
   * @param opts An object of options to pass as Textile options headers
   * @param data An object of data to put
   */
  protected async sendPatch(url: string, args?: string[], opts?: KeyValue, data?: any, headers?: KeyValue) {
    const response = await fetch(buildAbsoluteURL(this.baseURL, url), {
      method: 'patch',
      headers: createHeaders(args, opts, headers),
      body: JSON.stringify(data)
    })
    return handleErrors(response)
  }
}

export { API }
