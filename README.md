# Textile JS HTTP Client _(js-http-client)_

[![Made by Textile](https://img.shields.io/badge/made%20by-Textile-informational.svg?style=popout-square)](https://textile.io)
[![Chat on Slack](https://img.shields.io/badge/slack-slack.textile.io-informational.svg?style=popout-square)](https://slack.textile.io)
[![Keywords](https://img.shields.io/github/package-json/keywords/textileio/js-http-client.svg?style=popout-square)](./package.json)

[![GitHub package.json version](https://img.shields.io/github/package-json/v/textileio/js-http-client.svg?style=popout-square)](./package.json)
[![npm (scoped)](https://img.shields.io/npm/v/@textile/js-http-client.svg?style=popout-square)](https://www.npmjs.com/package/@textile/js-http-client)
[![node (scoped)](https://img.shields.io/node/v/@textile/js-http-client.svg?style=popout-square)](https://www.npmjs.com/package/@textile/js-http-client)
[![GitHub license](https://img.shields.io/github/license/textileio/js-http-client.svg?style=popout-square)](./LICENSE)
[![David](https://img.shields.io/david/dev/textileio/js-http-client.svg)](https://david-dm.org/textileio/js-http-client)
[![CircleCI branch](https://img.shields.io/circleci/project/github/textileio/js-http-client/master.svg?style=popout-square)](https://circleci.com/gh/textileio/js-http-client)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=popout-square)](https://github.com/RichardLitt/standard-readme)
[![docs](https://img.shields.io/badge/docs-master-success.svg?style=popout-square)](https://textileio.github.io/js-http-client/)

> Official Textile JS HTTP Wrapper Client

Join us on our [public Slack channel](https://slack.textile.io/) for news, discussions, and status updates. For current status, and where you can help, please see [issue #1](https://github.com/textileio/js-http-client/issues/1).

**Important**: With the move to Typescript and our 0.2.x release, `js-http-client` is now
published under the `@textile` namespace, rather than `@textileio`. Previous
releases will remain available under `@textileio`, however, all
code should be updated to reflect this change.

## Table of Contents

- [Textile JS HTTP Client _(js-http-client)_](#textile-js-http-client-js-http-client)
  - [Table of Contents](#table-of-contents)
  - [Background](#background)
  - [Development](#development)
  - [Documentation](#documentation)
  - [Roadmap](#roadmap)
  - [Maintainer](#maintainer)
  - [Contributing](#contributing)
  - [Contributors](#contributors)
  - [License](#license)

## Background

[Textile](https://www.textile.io) provides encrypted, recoverable, schema-based, and cross-application data storage built on [IPFS](https://github.com/ipfs) and [libp2p](https://github.com/libp2p). We like to think of it as a decentralized data wallet with built-in protocols for sharing and recovery, or more simply, **an open and programmable iCloud**.

The reference implementation of Textile is [written in Go](https://github.com/textileio/textile-go), and can be compiled to various platforms, including mobile (Android/iOS) and desktop/server (OSX, Windows, Linux, etc). The library in this repo is designed to help support things like browser-based Textile apps, Node.js apps, and other use-cases.

This library provides access to an underlying `textile-go` node's REST API, adding various simplified APIs to support in-browser and programmatic desktop access. For the most part, the API would mimic the command-line and/or mobile APIs of `textile-go`, with some browser-specific enhancements.

## Development

```sh
# Run all the unit tests
yarn test

# Lint everything
# NOTE: Linting uses `prettier` to auto-fix styling issues when possible
yarn lint
```

## Documentation

[View Documentation](./docs/README.md)

The auto-generated documentation can be found at https://textileio.github.io/js-http-client/.

```sh
# Re-build the documentation
yarn docs
```

## Roadmap

This should provide a useful 'checklist' for community members looking to get involved.

- [ ] Implement [sub api](https://github.com/textileio/textile-go/blob/master/cmd/sub.go)
- [ ] Switch to TypeScript
- [ ] Full test suite
- [ ] More to come...

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

## Contributors
<!-- Update with yarn credit -->
<!-- ⛔️ AUTO-GENERATED-CONTENT:START (CONTRIBUTORS) -->
| **Commits** | **Contributor** |  
| --- | --- |  
| 53 | [carsonfarmer](https://github.com/carsonfarmer) |  
| 2  | [andrewxhill](https://github.com/andrewxhill) |  
| 2  | [robbynshaw](https://github.com/robbynshaw) |  
| 1  | [flyskywhy](https://github.com/flyskywhy) |  

<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

## License

[MIT](./LICENSE)
