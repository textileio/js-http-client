/* GENERATED FROM model.proto. DO NOT EDIT MANUALLY. */
/* tslint:disabled */
/* eslint-disable */

import * as message from './message_pb'

export interface Peer {
  id: string
  address: string
  name: string
  avatar: string
  inboxes: Cafe[]
  created: string
  updated: string
}

export interface PeerList {
  items: Peer[]
}

export interface User {
  address: string
  name: string
  avatar: string
}

export interface Contact {
  address: string
  name: string
  avatar: string
  peers: Peer[]
  threads: string[]
}

export interface ContactList {
  items: Contact[]
}

export interface Thread {
  id: string
  key: string
  sk: string
  name: string
  schema: string
  initiator: string
  type: Thread.Type
  sharing: Thread.Sharing
  whitelist: string[]
  state: Thread.State
  head: string
  head_blocks: Block[]
  schema_node: Node
  block_count: number
  peer_count: number
}

export namespace Thread {
  export enum Type {
    PRIVATE = 'PRIVATE',
    READ_ONLY = 'READ_ONLY',
    PUBLIC = 'PUBLIC',
    OPEN = 'OPEN'
  }

  export enum Sharing {
    NOT_SHARED = 'NOT_SHARED',
    INVITE_ONLY = 'INVITE_ONLY',
    SHARED = 'SHARED'
  }

  export enum State {
    LOADING_TAIL = 'LOADING_TAIL',
    LOADED = 'LOADED',
    LOADING_HEAD = 'LOADING_HEAD'
  }
}

export interface ThreadList {
  items: Thread[]
}

export interface ThreadPeer {
  id: string
  thread: string
  welcomed: boolean
}

export interface Block {
  id: string
  thread: string
  author: string
  type: Block.BlockType
  date: string
  parents: string[]
  target: string
  body: string
  user: User
}

export namespace Block {
  export enum BlockType {
    MERGE = 'MERGE',
    IGNORE = 'IGNORE',
    FLAG = 'FLAG',
    JOIN = 'JOIN',
    ANNOUNCE = 'ANNOUNCE',
    LEAVE = 'LEAVE',
    TEXT = 'TEXT',
    FILES = 'FILES',
    COMMENT = 'COMMENT',
    LIKE = 'LIKE',
    ADD = 'ADD'
  }
}

export interface BlockList {
  items: Block[]
}

export interface BlockMessage {
  id: string
  peer: string
  env: message.Envelope
  date: string
}

export interface Invite {
  id: string
  block: string
  name: string
  inviter: Peer
  date: string
}

export interface InviteList {
  items: Invite[]
}

export interface FileIndex {
  mill: string
  checksum: string
  source: string
  opts: string
  hash: string
  key: string
  media: string
  name: string
  size: string
  added: string
  meta: Record<string, any>
  targets: string[]
}

export interface Node {
  name: string
  pin: boolean
  plaintext: boolean
  mill: string
  opts: Node.Opts
  json_schema: Record<string, any>
  links: Node.Links
}

export namespace Node {
  export interface Opts {
    [k: string]: string
  }

  export interface Links {
    [k: string]: Link
  }
}

export interface Link {
  use: string
  pin: boolean
  plaintext: boolean
  mill: string
  opts: Link.Opts
  json_schema: Record<string, any>
}

export namespace Link {
  export interface Opts {
    [k: string]: string
  }
}

export interface Notification {
  id: string
  date: string
  actor: string
  subject: string
  subject_desc: string
  block: string
  target: string
  type: Notification.Type
  body: string
  read: boolean
  user: User
}

export namespace Notification {
  export enum Type {
    INVITE_RECEIVED = 'INVITE_RECEIVED',
    ACCOUNT_PEER_JOINED = 'ACCOUNT_PEER_JOINED',
    PEER_JOINED = 'PEER_JOINED',
    PEER_LEFT = 'PEER_LEFT',
    MESSAGE_ADDED = 'MESSAGE_ADDED',
    FILES_ADDED = 'FILES_ADDED',
    COMMENT_ADDED = 'COMMENT_ADDED',
    LIKE_ADDED = 'LIKE_ADDED'
  }
}

export interface NotificationList {
  items: Notification[]
}

export interface Cafe {
  peer: string
  address: string
  api: string
  protocol: string
  node: string
  url: string
  swarm: string[]
}

export interface CafeSession {
  id: string
  access: string
  exp: string
  refresh: string
  rexp: string
  subject: string
  type: string
  cafe: Cafe
}

export interface CafeSessionList {
  items: CafeSession[]
}

export interface CafeRequest {
  id: string
  peer: string
  target: string
  cafe: Cafe
  type: CafeRequest.Type
  size: string
  group: string
  date: string
  status: CafeRequest.Status
}

export namespace CafeRequest {
  export enum Type {
    STORE = 'STORE',
    UNSTORE = 'UNSTORE',
    STORE_THREAD = 'STORE_THREAD',
    UNSTORE_THREAD = 'UNSTORE_THREAD',
    INBOX = 'INBOX'
  }

  export enum Status {
    NEW = 'NEW',
    PENDING = 'PENDING',
    COMPLETE = 'COMPLETE'
  }
}

export interface CafeRequestList {
  items: CafeRequest[]
}

export interface CafeRequestGroupStatus {
  num_total: number
  num_pending: number
  num_complete: number
  size_total: string
  size_pending: string
  size_complete: string
}

export interface CafeHTTPRequest {
  type: CafeHTTPRequest.Type
  url: string
  headers: CafeHTTPRequest.Headers
  body: string
}

export namespace CafeHTTPRequest {
  export interface Headers {
    [k: string]: string
  }

  export enum Type {
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
  }
}

export interface CafeMessage {
  id: string
  peer: string
  date: string
  attempts: number
}

export interface CafeClientNonce {
  value: string
  address: string
  date: string
}

export interface CafeClient {
  id: string
  address: string
  created: string
  seen: string
  token: string
}

export interface CafeClientList {
  items: CafeClient[]
}

export interface CafeToken {
  id: string
  value: string
  date: string
}

export interface CafeClientThread {
  id: string
  client: string
  ciphertext: string
}

export interface CafeClientMessage {
  id: string
  peer: string
  client: string
  date: string
}
