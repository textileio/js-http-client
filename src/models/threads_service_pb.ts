/* GENERATED FROM threads_service.proto. DO NOT EDIT MANUALLY. */
/* tslint:disabled */
/* eslint-disable */

import * as model from './model_pb'

export interface ThreadEnvelope {
  thread: string
  hash: string
  ciphertext: string
  sig: string
}

export interface ThreadBlock {
  header: ThreadBlockHeader
  type: model.Block.BlockType
  payload: any
}

export interface ThreadBlockHeader {
  date: string
  parents: string[]
  author: string
  address: string
}

export interface ThreadAdd {
  inviter: model.Peer
  thread: model.Thread
}

export interface ThreadIgnore {
  target: string
}

export interface ThreadFlag {
  target: string
}

export interface ThreadJoin {
  inviter: string
  peer: model.Peer
}

export interface ThreadAnnounce {
  peer: model.Peer
  name: string
}

export interface ThreadMessage {
  body: string
}

export interface ThreadFiles {
  target: string
  body: string
  keys: ThreadFiles.Keys
}

export namespace ThreadFiles {
  export interface Keys {
    [k: string]: string
  }
}

export interface ThreadComment {
  target: string
  body: string
}

export interface ThreadLike {
  target: string
}
