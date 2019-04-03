import { EventEmitter2 } from 'eventemitter2'
import { CancelTokenSource } from 'axios'

// Protobuf types created from go-textile using:
// yarn add https://github.com/carsonfarmer/protoc-gen-jsonpb-ts
// cd pb/protos
// protoc --plugin=../../node_modules/.bin/protoc-gen-jsonpb-ts --jsonpb-ts_out=. *.proto
export * from './model_pb'
export * from './cafe_service_pb'
export * from './message_pb'
export * from './query_pb'
export * from './threads_service_pb'
export * from './view_pb'

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
 * Additional options to control search queries
 * @typedef {Object} QueryOptions
 * @param local Whether to only search local contacts
 * @param remote Whether to only search remote contacts
 * @param limit Stops searching after 'limit' results are found
 * @param wait Stops searching after ‘wait’ seconds have elapsed
 */
export interface QueryOptions {
  local?: boolean
  remote?: boolean
  limit?: number
  wait?: number
}

/**
 * The options object for the client object
 * @property {key} [string]
 * @property {value} [string]
 */
export interface KeyValue {
  [key: string]: string | number | boolean
}

/**
 * Event emitter with found, done, and error events.
 * The Event emitter has an additional cancel property that can be used to cancel the search.
 *
 * @property emitter The event emitter
 * @property source The cancel source (`source.cancel()` cancels the request)
 */
export interface RunningEvent {
  emitter: EventEmitter2
  source: CancelTokenSource
}

/**
 * Version information for Textile nodes
 * @property cafe_version The API version of the Cafe
 * @property node_version The release version of the running node
 */
export interface Versions {
  cafe_version: string
  node_version: string
}

/**
 * A derived Wallet account
 * @property index The index for the given account
 * @property seed The Ed25519 private seed/key
 * @property address The Ed25519 public key
 */
export interface Account {
  index: number
  seed: string
  address: string
}
