# Textile JS HTTP Client _(js-http-client)_

[![Made by Textile](https://img.shields.io/badge/made%20by-Textile-informational.svg?style=popout-square)](https://textile.io)
[![Chat on Slack](https://img.shields.io/badge/slack-slack.textile.io-informational.svg?style=popout-square)](https://slack.textile.io)
[![Keywords](https://img.shields.io/github/package-json/keywords/textileio/js-http-client.svg?style=popout-square)](./package.json)

[![GitHub package.json version](https://img.shields.io/github/package-json/v/textileio/js-http-client.svg?style=popout-square)](./package.json)
[![npm (scoped)](https://img.shields.io/npm/v/@textileio/js-http-client.svg?style=popout-square)](https://www.npmjs.com/package/@textileio/js-http-client)
[![node (scoped)](https://img.shields.io/node/v/@textileio/js-http-client.svg?style=popout-square)](https://www.npmjs.com/package/@textileio/js-http-client)
[![GitHub license](https://img.shields.io/github/license/textileio/js-http-client.svg?style=popout-square)](./LICENSE)
[![David](https://img.shields.io/david/dev/textileio/js-http-client.svg)](https://david-dm.org/textileio/js-http-client)
[![CircleCI branch](https://img.shields.io/circleci/project/github/textileio/js-http-client/master.svg?style=popout-square)](https://circleci.com/gh/textileio/js-http-client)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=popout-square)](https://github.com/RichardLitt/standard-readme)

> Official Textile JS HTTP Wrapper Client

Join us on our [public Slack channel](https://slack.textile.io/) for news, discussions, and status updates. For current status, and where you can help, please see [issue #1](https://github.com/textileio/js-http-client/issues/1).

## Table of Contents

- [Background](#background)
  - [Organization](#organization)
- [Install](#install)
- [Usage](#usage)
- [Documentation](#documentation)
- [Roadmap](#roadmap)
- [Contribute](#contribute)
- [License](#license)

## Background

[Textile](https://www.textile.io) provides encrypted, recoverable, schema-based, and cross-application data storage built on [IPFS](https://github.com/ipfs) and [libp2p](https://github.com/libp2p). We like to think of it as a decentralized data wallet with built-in protocols for sharing and recovery, or more simply, **an open and programmable iCloud**.

The reference implementation of Textile is [written in Go](https://github.com/textileio/textile-go), and can be compiled to various platforms, including mobile (Android/iOS) and desktop/server (OSX, Windows, Linux, etc). The library in this repo is designed to help support things like browser-based Textile apps, Node.js apps, and other use-cases.

This library provides access to an underlying `textile-go` node's REST API, adding various simplified APIs to support in-browser and programmatic desktop access. For the most part, the API would mimic the command-line and/or mobile APIs of `textile-go`, with some browser-specific enhancements.

### Organization

The main entry point is at `index.js`. This class contains the main `Textile` export which in turn contains each of the sub-modules as properties of the class. Each sub-module is found in the `modules` folder.

Sub-modules are organized generally by endpoint, so the `textile.thread` module would contain all of the functionality under `/api/v0/threads`.

All unit tests can be found in the `test` folder.

## Install

`js-http-client` is available on [`npmjs.com`](https://www.npmjs.com/package/@textileio/js-http-client) under the `@textile` scope. Install it using your favorite package manager:

```sh
yarn add @textileio/js-http-client
# npm i @textileio/js-http-client
```

## Usage

```javascript
// Import the main Textile client
const Textile = require("@textile/js-http-client");

// Create an instance of the client using the default options
const textile = new Textile();

// Or, create an instance specifying your custom Textile node API connection
const textile = new Textile({
  url: "http://127.0.0.1", // e.g., "http://api.textile.io"
  port: 40602, // null
});

// Get your Textile node's peer ID
const peerID = await textile.ipfs.peerId();
console.log(`My Peer ID is '${peerID}'.\n`);
// > My Peer ID is '12324234xx2343232...'

// Get your Textile node's address
const address = await textile.profile.address();
console.log(`My node's address is '${address}'.\n`);
// > My node's address is '9232834kswjlwklj2...'

// Get a paginated list of files
const files = await textile.files.list({
  thread: "12D3Kblah...",
  limit: 1,
  offset: "QmYblah..."
});
console.log("Files", files);
```

For more detailed examples of usage, peruse the `examples` folder.

## Development

```sh
# Run all the unit tests
yarn test

# Watch the folder and run the unit tests when changes happen
yarn test-watch

# Lint everything
# NOTE: Linting uses `prettier` to auto-fix styling issues when possible
yarn lint

# Watch the folder and run the linter when changes happen
yarn lint-watch
```

## Documentation

The jsdoc-based auto-generated documentation can be found at https://textileio.github.io/js-http-client/.

```sh
# Re-build the documentation
yarn build-docs
```

## Roadmap

Note: This is based on the existing structure of [`textile-go`](https://github.com/textileio/textile-go). As such, it may contain inconsistencies until further editing. These checkboxes laid out in the most likely order of difficulty, with each new subgroup depending on the previous ones to some degree. This should provide a useful 'checklist' for community members looking to get involved.

- [x] [wallet](https://github.com/textileio/textile-go/tree/master/wallet) - difficulty level: ~~easy~~, could be separate module, nearly direct port
- [x] [account](https://github.com/textileio/textile-go/blob/master/cmd/account.go) (address, peers, backup)
  - [] Methods available on mobile (seed, encrypt, decrypt)
- [x] [profile](https://github.com/textileio/textile-go/blob/master/cmd/profile.go) (get, set {username, avatar})
- [x] [threads](https://github.com/textileio/textile-go/blob/master/cmd/threads.go)
  - [x] list, get, remove, peers
  - [x] add, default
- [x] [comments](https://github.com/textileio/textile-go/blob/master/cmd/comments.go)
  - list, get, remove, add
- [x] [likes](https://github.com/textileio/textile-go/blob/master/cmd/likes.go)
  - list, get, remove, add
- [x] [messages](https://github.com/textileio/textile-go/blob/master/cmd/messages.go)
  - list, get, remove, add
- [x] [invites](https://github.com/textileio/textile-go/blob/master/cmd/invites.go)
  - accept, create, ignore, list
- [x] [files](https://github.com/textileio/textile-go/blob/master/cmd/files.go)
  - [x] list, get
  - [x] list keys
- [x] schemas + mills
  - [x] [mill schema](https://github.com/textileio/textile-go/blob/master/core/api_mill.go)
  - [x] [create thread w/ custom schema](https://github.com/textileio/textile-go/blob/master/cmd/threads.go#L105)
  - [x] [local schema fulfillment](https://github.com/textileio/minimal-client-demo)
  - [x] [add thread files](https://github.com/textileio/textile-go/blob/master/cmd/files.go#L112)
- [x] [contacts](https://github.com/textileio/textile-go/blob/master/cmd/contacts.go)
  - [x] list, get, remove
  - [x] search, add
- [x] [feed](https://github.com/textileio/textile-go/blob/master/cmd/feed.go)
- [x] [notifications api](https://github.com/textileio/textile-go/blob/master/cmd/notifications.go)
- [x] [cafes](https://github.com/textileio/textile-go/blob/master/cmd/cafe.go) (keep simple to start, minimal cafe hosting utilities)
  - [x] [add, get, list tokens](https://github.com/textileio/textile-go/blob/master/cmd/tokens.go)
  - [x] add/register
  - [x] list, get, remove, messages
- [x] others
  - [x] [config](https://github.com/textileio/textile-go/blob/master/cmd/config.go)
  - [x] [logs](https://github.com/textileio/textile-go/blob/master/cmd/logs.go)
  - [x] ipfs (id, connect, ping, peers)
- [ ] [sub api](https://github.com/textileio/textile-go/blob/master/cmd/sub.go)
    
## Maintainer

[Carson Farmer](https://github.com/carsonfarmer)

## Contributing

Textile's JS HTTP Client is a work in progress. As such, there's a few things you can do right now to help out:

  * Check out [issue 1](https://github.com/textileio/js-http-client/issues/1) for an up-to-date list (maintained by [carsonfarmer](https://github.com/carsonfarmer)) of tasks that could use your help.
  * Ask questions! We'll try to help. Be sure to drop a note (on the above issue) if there is anything you'd like to work on and we'll update the issue to let others know. Also [get in touch](https://slack.textile.io) on Slack.
  * Log bugs, [file issues](https://github.com/textileio/js-http-client/issues), submit pull requests!
  * **Perform code reviews**. More eyes will help a) speed the project along b) ensure quality and c) reduce possible future bugs.
  * Take a look at [textile-go](https://github.com/textileio/textile-go) (which we intend to follow to a point), and also at some of the client repositories: for instance, [`textile-mobile`](https://github.com/textileio/textile-mobile) and the Textile [`react-native-sdk`](https://github.com/textileio/react-native-sdk). Contributions here that would be most helpful are **top-level comments** about how it should look based on our understanding. Again, the more eyes the better.
  * **Add tests**. There can never be enough tests.
  * **Contribute to the [Textile WIKI](https://github.com/textileio/textile-go/wiki)** with any additions or questions you have about Textile and its various impmenentations. A good example would be asking, "What is a thread?". If you don't know a term, odds are someone else doesn't either. Eventually, we should have a good understanding of where we need to improve communications and teaching together to make Textile even better.
  
 Before you get started, be sure to read our [contributors guide](./CONTRIBUTING.md) and our [contributor covenant code of conduct](./CODE_OF_CONDUCT.md).

### Contributors

Carson Farmer <carson@textile.io>  
Robby Shaw <robbynshaw@gmail.com>


## License

[MIT](./LICENSE)
