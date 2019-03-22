Textile JS HTTP Client _(js-http-client)_
=====================

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
const Textile = require("@textileio/js-http-client");

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