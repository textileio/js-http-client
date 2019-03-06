const { describe, it } = require("mocha");
const { expect } = require("chai");
const { Textile } = require("../index");

describe("client module object", () => {
  it("should contain profile module", () => {
    const textile = new Textile();
    expect(textile).to.have.property("profile");
  });
});
