/* GENERATED FROM mobile.proto. DO NOT EDIT MANUALLY. */
/* tslint:disabled */
/* eslint-disable */

import * as view from './view_pb'
import * as query from './query_pb'
import * as message from './message_pb'

export interface MobileWalletAccount {
  seed: string
  address: string
}

export interface MobilePreparedFiles {
  dir: view.Directory
  pin: MobilePreparedFiles.Pin
}

export namespace MobilePreparedFiles {
  export interface Pin {
    [k: string]: string
  }
}

export interface MobileQueryEvent {
  id: string
  type: MobileQueryEvent.Type
  data: query.QueryResult
  error: message.Error
}

export namespace MobileQueryEvent {
  export enum Type {
    DATA = 'DATA',
    DONE = 'DONE',
    ERROR = 'ERROR'
  }
}

export enum MobileEventType {
  NODE_START = 'NODE_START',
  NODE_ONLINE = 'NODE_ONLINE',
  NODE_STOP = 'NODE_STOP',
  WALLET_UPDATE = 'WALLET_UPDATE',
  THREAD_UPDATE = 'THREAD_UPDATE',
  NOTIFICATION = 'NOTIFICATION',
  QUERY_RESPONSE = 'QUERY_RESPONSE'
}
