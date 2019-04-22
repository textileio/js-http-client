/* GENERATED FROM view.proto. DO NOT EDIT MANUALLY. */
/* tslint:disabled */
/* eslint-disable */

import * as model from './model_pb'

export interface AddThreadConfig {
  key: string
  name: string
  schema: AddThreadConfig.Schema
  type: model.Thread.Type
  sharing: model.Thread.Sharing
  members: string[]
  force: boolean
}

export namespace AddThreadConfig {
  export interface Schema {
    id: string
    json: string
    preset: AddThreadConfig.Schema.Preset
  }

  export namespace Schema {
    export enum Preset {
      NONE = 'NONE',
      BLOB = 'BLOB',
      CAMERA_ROLL = 'CAMERA_ROLL',
      MEDIA = 'MEDIA'
    }
  }
}

export interface BlockViz {
  dots: string
  count: number
  next: string
}

export interface Step {
  name: string
  link: model.Link
}

export interface Directory {
  files: Directory.Files
}

export namespace Directory {
  export interface Files {
    [k: string]: model.FileIndex
  }
}

export interface DirectoryList {
  items: Directory[]
}

export interface Keys {
  files: Keys.Files
}

export namespace Keys {
  export interface Files {
    [k: string]: string
  }
}

export interface InviteView {
  id: string
  name: string
  inviter: model.User
  date: string
}

export interface InviteViewList {
  items: InviteView[]
}

export interface ExternalInvite {
  id: string
  key: string
  inviter: string
}

export interface FeedRequest {
  thread: string
  offset: string
  limit: number
  mode: FeedRequest.Mode
}

export namespace FeedRequest {
  export enum Mode {
    CHRONO = 'CHRONO',
    ANNOTATED = 'ANNOTATED',
    STACKS = 'STACKS'
  }
}

export interface FeedItem {
  block: string
  thread: string
  payload: any
}

export interface FeedItemList {
  items: FeedItem[]
  count: number
  next: string
}

export interface Merge {
  block: string
  date: string
  user: model.User
  targets: FeedItem[]
}

export interface Ignore {
  block: string
  date: string
  user: model.User
  target: FeedItem
}

export interface Flag {
  block: string
  date: string
  user: model.User
  target: FeedItem
}

export interface Join {
  block: string
  date: string
  user: model.User
  likes: Like[]
}

export interface Announce {
  block: string
  date: string
  user: model.User
}

export interface Leave {
  block: string
  date: string
  user: model.User
  likes: Like[]
}

export interface Text {
  block: string
  date: string
  user: model.User
  body: string
  comments: Comment[]
  likes: Like[]
}

export interface TextList {
  items: Text[]
}

export interface File {
  index: number
  file: model.FileIndex
  links: File.Links
}

export namespace File {
  export interface Links {
    [k: string]: model.FileIndex
  }
}

export interface Files {
  block: string
  target: string
  date: string
  user: model.User
  caption: string
  files: File[]
  comments: Comment[]
  likes: Like[]
  threads: string[]
}

export interface FilesList {
  items: Files[]
}

export interface Comment {
  id: string
  date: string
  user: model.User
  body: string
  target: FeedItem
}

export interface CommentList {
  items: Comment[]
}

export interface Like {
  id: string
  date: string
  user: model.User
  target: FeedItem
}

export interface LikeList {
  items: Like[]
}

export interface WalletUpdate {
  id: string
  key: string
  type: WalletUpdate.Type
}

export namespace WalletUpdate {
  export enum Type {
    THREAD_ADDED = 'THREAD_ADDED',
    THREAD_REMOVED = 'THREAD_REMOVED',
    ACCOUNT_PEER_ADDED = 'ACCOUNT_PEER_ADDED',
    ACCOUNT_PEER_REMOVED = 'ACCOUNT_PEER_REMOVED'
  }
}

export interface Summary {
  id: string
  address: string
  account_peer_count: number
  thread_count: number
  files_count: number
  contact_count: number
}

export interface LogLevel {
  systems: LogLevel.Systems
}

export namespace LogLevel {
  export interface Systems {
    [k: string]: LogLevel.Level
  }

  export enum Level {
    CRITICAL = 'CRITICAL',
    ERROR = 'ERROR',
    WARNING = 'WARNING',
    NOTICE = 'NOTICE',
    INFO = 'INFO',
    DEBUG = 'DEBUG'
  }
}
