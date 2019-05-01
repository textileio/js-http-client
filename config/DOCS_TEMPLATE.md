Textile JS HTTP Client _(js-http-client)_
=====================

[Textile](https://www.textile.io) provides encrypted, recoverable, schema-based, and cross-application data storage built on [IPFS](https://github.com/ipfs) and [libp2p](https://github.com/libp2p). We like to think of it as a decentralized data wallet with built-in protocols for sharing and recovery, or more simply, **an open and programmable iCloud**.

The reference implementation of Textile is [written in Go](https://github.com/textileio/go-textile), and can be compiled to various platforms, including mobile (Android/iOS) and desktop/server (OSX, Windows, Linux, etc). The `js-http-client` library is designed to help support things like browser-based Textile apps, Node.js apps, and other use-cases.

This library provides access to an underlying `go-textile` node's REST API, adding various simplified APIs to support in-browser and programmatic desktop access. For the most part, the API would mimic the command-line and/or mobile APIs of `go-textile`, with some browser-specific enhancements.

## Install

`js-http-client` is available on [`npmjs.com`](https://www.npmjs.com/package/@textile/js-http-client) under the `@textile` scope. Install it using your favorite package manager:

```sh
yarn add @textile/js-http-client
# npm i @textile/js-http-client
```

## Usage

```javascript
// Import the main Textile client
const { Textile } = require("@textile/js-http-client");

// Create an instance of the client using the default options
const textile = new Textile();

// Or, create an instance specifying your custom Textile node API connection
const textile = new Textile({
  url: "http://127.0.0.1",
  port: 40602,
});

// Get your local Textile account's contact info
const contact = await textile.account.contact();
console.log(`My display name is '${contact.name}'`);
// > My display name is 'clyde'.

// Get your Textile node's address
const address = await textile.profile.address();
console.log(`My node's address is '${address}'`);
// > My node's address is 'P69vwxHTh1p5...'

// Get a paginated list of files
const files = await textile.files.list()
});
console.log("files", files.items);
```

For more detailed examples of usage, peruse the `examples` folder and see the [live `docs`](https://textileio.github.io/js-http-client/).