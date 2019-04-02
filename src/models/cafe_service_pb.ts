/* GENERATED FROM cafe_service.proto. DO NOT EDIT MANUALLY. */
/* tslint:disabled */
/* eslint-disable */

import * as model from './model_pb'

export interface CafeChallenge {
  address: string
}

export interface CafeNonce {
  value: string
}

export interface CafeRegistration {
  address: string
  value: string
  nonce: string
  sig: string
  token: string
}

export interface CafeDeregistration {
  token: string
}

export interface CafeDeregistrationAck {
  id: string
}

export interface CafeRefreshSession {
  access: string
  refresh: string
}

export interface CafePublishPeer {
  token: string
  peer: model.Peer
}

export interface CafePublishPeerAck {
  id: string
}

export interface CafeStore {
  token: string
  cids: string[]
}

export interface CafeStoreAck {
  id: string
}

export interface CafeUnstore {
  token: string
  cids: string[]
}

export interface CafeUnstoreAck {
  cids: string[]
}

export interface CafeObjectList {
  cids: string[]
}

export interface CafeObject {
  token: string
  cid: string
  data: string
  node: string
}

export interface CafeStoreThread {
  token: string
  id: string
  ciphertext: string
}

export interface CafeStoreThreadAck {
  id: string
}

export interface CafeUnstoreThread {
  token: string
  id: string
}

export interface CafeUnstoreThreadAck {
  id: string
}

export interface CafeDeliverMessage {
  id: string
  client: string
}

export interface CafeCheckMessages {
  token: string
}

export interface CafeMessages {
  messages: model.CafeMessage[]
}

export interface CafeDeleteMessages {
  token: string
}

export interface CafeDeleteMessagesAck {
  more: boolean
}
