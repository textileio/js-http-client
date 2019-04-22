/* GENERATED FROM query.proto. DO NOT EDIT MANUALLY. */
/* tslint:disabled */
/* eslint-disable */

export interface QueryOptions {
  localOnly: boolean
  remoteOnly: boolean
  limit: number
  wait: number
  filter: QueryOptions.FilterType
  exclude: string[]
}

export namespace QueryOptions {
  export enum FilterType {
    NO_FILTER = 'NO_FILTER',
    HIDE_OLDER = 'HIDE_OLDER'
  }
}

export interface Query {
  id: string
  token: string
  type: Query.Type
  options: QueryOptions
  payload: any
}

export namespace Query {
  export enum Type {
    THREAD_SNAPSHOTS = 'THREAD_SNAPSHOTS',
    CONTACTS = 'CONTACTS'
  }
}

export interface PubSubQuery {
  id: string
  type: Query.Type
  payload: any
  responseType: PubSubQuery.ResponseType
  exclude: string[]
  topic: string
  timeout: number
}

export namespace PubSubQuery {
  export enum ResponseType {
    P2P = 'P2P',
    PUBSUB = 'PUBSUB'
  }
}

export interface QueryResult {
  id: string
  date: string
  local: boolean
  value: any
}

export interface QueryResults {
  type: Query.Type
  items: QueryResult[]
}

export interface PubSubQueryResults {
  id: string
  results: QueryResults
}

export interface ContactQuery {
  address: string
  name: string
}

export interface ThreadSnapshotQuery {
  address: string
}
