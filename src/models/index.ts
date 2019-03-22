import { EventEmitter2 } from 'eventemitter2'
import { CancelTokenSource } from 'axios'

// **** Definitions
/**
 * The options object for the client object
 * @typedef {Object} ApiOptions
 * @property {string} [url='http://127.0.0.1'] - The base URL of the Textile node API
 * @property {number} [port='40600'] - The port of the Textile node API
 */
export interface ApiOptions {
  url: string
  port: string
}

/**
 * The options object for the client object
 * @property {key} [string]
 * @property {value} [string]
 */
export interface KeyValue {
  [key: string]: string | number | boolean
}

export interface RunningEvent {
  emitter: EventEmitter2
  source: CancelTokenSource
}
