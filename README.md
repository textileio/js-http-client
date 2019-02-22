# Textile JS HTTP Client

> Future home of official Textile JS HTTP wrapper client

Join us on our [public Slack channel](https://slack.textile.io/) for news, discussions, and status updates.

For the current status, and where you can help, please see [issue #1](https://github.com/textileio/js-textile-http-client/issues/1).

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

This library will provide access to an underlying `textile-go` node's REST API, adding various simplified APIs to support in-browser and programmatic desktop access. For the most part, the API would mimic the command-line and/or mobile APIs of `textile-go`, with some browser-specific enhancements. Compared to something like [MongoDBs JS client](https://github.com/mongodb/node-mongodb-native) a `js-textile-http-client` client would be pretty simple. The [IPFS http-client](https://github.com/ipfs/js-ipfs-http-client) lib is another pretty nice example,  though this is more of a wrapper than a true 'client', in the sense that it is mostly a 1-to-1 API. There are several things that a Textile client must support, including fulfilling Schemas ‘locally’ and providing a useful UI. Some examples of fulfilling a Schema in this way from JS are [already available](https://gist.github.com/carsonfarmer/a26a0d01ae58ffa7b8cd2689e149406b) from some previous work.

### Organization

This repository is currently empty. The eventual structure of the project is as yet to be determined, though work is currently [already underway here](https://github.com/robbynshaw/textile-js-sdk).

## Install

> To be added

## Usage

> To be added, but something along the lines of:

```javascript
const { Textile } = require("textile-js-sdk");

const textile = new Textile();
const peerid = await textile.peer.get();
console.log("PeerID", peerid);
```

## Documentation

> To be added

## Roadmap

Note: This is based on the existing structure of [`textile-go`](https://github.com/textileio/textile-go). As such, it may contain inconsistencies until further editing. These checkboxes laid out in the most likely order of difficulty, with each new subgroup depending on the previous ones to some degree. This should provide a useful 'checklist' for community members looking to get involved.

- [ ] [wallet](https://github.com/textileio/textile-go/tree/master/wallet) - difficulty level: easy, could be separate module, nearly direct port
- [ ] [cmd](https://github.com/textileio/textile-go/tree/master/cmd) - difficulty level: moderate, should be main entry-point for a wrapper, similar to how `js-ipfs` mimicks the IPFS cli. Required elements here include:
  - [ ] [account](https://github.com/textileio/textile-go/blob/master/cmd/account.go) (address, peers, backup)
  - [ ] [profile](https://github.com/textileio/textile-go/blob/master/cmd/profile.go) (username, avatar)
  - [ ] [threads](https://github.com/textileio/textile-go/blob/master/cmd/threads.go)
    - [ ] list, get, remove, peers
    - [ ] add
  - [ ] [blocks](https://github.com/textileio/textile-go/blob/master/cmd/blocks.go)
    - [ ] list, get, remove, 
    - [ ] add + get comments, add + get likes
  - [ ] [files](https://github.com/textileio/textile-go/blob/master/cmd/files.go)
    - [ ] list, get
    - [ ] list keys
  - [ ] schemas + mills
    - [ ] [mill schema](https://github.com/textileio/textile-go/blob/master/core/api_mill.go)
    - [ ] [create thread w/ custom schema](https://github.com/textileio/textile-go/blob/master/cmd/threads.go#L105)
    - [ ] [local schema fulfillment](https://github.com/textileio/minimal-client-demo)
    - [ ] [add thread messages and files](https://github.com/textileio/textile-go/blob/master/cmd/files.go#L112)
  - [ ] [contacts](https://github.com/textileio/textile-go/blob/master/cmd/contacts.go)
    - [ ] list, get, remove
    - [ ] search, add
  - [ ] [feed](https://github.com/textileio/textile-go/blob/master/cmd/feed.go)
  - [ ] [sub api](https://github.com/textileio/textile-go/blob/master/cmd/sub.go)
  - [ ] [notifications api](https://github.com/textileio/textile-go/blob/master/cmd/notifications.go)
  - [ ] [cafes](https://github.com/textileio/textile-go/blob/master/cmd/cafe.go) (keep simple to start, minimal cafe hosting utilities)
    - [ ] [add, get, list tokens](https://github.com/textileio/textile-go/blob/master/cmd/tokens.go)
    - [ ] add/register
    - [ ] list, get, remove, messages
  - [ ] others
    - [ ] [config](https://github.com/textileio/textile-go/blob/master/cmd/config.go)
    - [ ] [logs](https://github.com/textileio/textile-go/blob/master/cmd/logs.go)
    - [ ] ipfs (id, connect, ping, peers)
    
## Contribute

Textile's JS HTTP Client is a work in progress. As such, there's a few things you can do right now to help out:

  * Check out [issue 1](https://github.com/textileio/js-textile-http-client/issues/1) for an up-to-date list (maintained by @carsonfarmer) of tasks that could use your help. Feel free to ask questions on that and we'll try to help. Be sure to drop a note if there is anything you'd like to work on and we'll update the issue to let others know. Also [get in touch](https://slack.textile.io) on Slack.
  * **Perform code reviews**. More eyes will help a) speed the project along b) ensure quality and c) reduce possible future bugs.
  * Take a look at [textile-go](https://github.com/textileio/textile-go) (which we intend to follow to a point), and also at some of the client repositories: for instance, [`textile-mobile`](https://github.com/textileio/textile-mobile) and the Textile [`react-native-sdk`](https://github.com/textileio/react-native-sdk). Contributions here that would be most helpful are **top-level comments** about how it should look based on our understanding. Again, the more eyes the better.
  * **Add tests**. There can never be enough tests.
  * **Contribute to the [Textile WIKI](https://github.com/textileio/textile-go/wiki)** with any additions or questions you have about Textile and its various impmenentations. A good example would be asking, "What is a thread?". If you don't know a term, odds are someone else doesn't either. Eventually, we should have a good understanding of where we need to improve communications and teaching together to make Textile even better.
  
 Before you get started, be sure to read our [contributors guide](CONTRIBUTING.md) and our [contributor covenant code of conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE)
