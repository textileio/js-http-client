const { describe, it } = require("mocha");
const { expect } = require("chai");
const Textile = require("../index");

describe("client module object", () => {
  it("should contain peer module", () => {
    const textile = new Textile();
    expect(textile).to.have.property("peer");
  });
});
