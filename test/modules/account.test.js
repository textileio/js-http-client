const { describe, it } = require("mocha");
const { expect } = require("chai");
const nock = require("nock");
const { Account } = require("../../modules/account");
const responses = require("./responses/account.json");

const opts = {
  url: "http://127.0.0.1",
  port: 40600,
  blah: ""
};

const ROOT = `${opts.url}:${opts.port}`;

const account = new Account(opts);

describe("account api peers", () => {
  it("should respond with object of peer items", async () => {
    nock(ROOT)
      .get("/api/v0/account/peers")
      .reply(200, responses.account.peers);

    const rsp = await account.peers();
    expect(rsp).to.deep.equal({ items: [] });
  });
});

describe("account api address", () => {
  it("should respond with plain text address", async () => {
    nock(ROOT)
      .get("/api/v0/account/address")
      .reply(200, responses.account.address);

    const rsp = await account.address();
    expect(rsp).to.equal("P9UcFifmikQr591RhgUShlAJd5Sxfcj3W8hrhwYG9oDTButN");
  });
});

// describe("peer api ping", () => {
//   it("should respond with 400", async () => {
//     nock(ROOT)
//       .get("/api/v0/ping")
//       .reply(400, "x");

//     let err;

//     try {
//       await peer.ping();
//     } catch (error) {
//       err = error.message;
//     }

//     expect(err).to.equal("Request failed with status code 400");
//   });
// });
