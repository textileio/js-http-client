const { describe, it } = require("mocha");
const { expect } = require("chai");
const { SchemaMiller } = require("../../helpers/schema-miller.js");
const simpleSchema = require("./schemas/simple.json");

describe("simple schema", () => {
  it("should be sorted by dependencies", () => {
    const sorted = SchemaMiller.sortLinksByDependency(simpleSchema.links);

    expect(sorted[2].name).to.equal("thumb");
  });

  it("should have normalized options", () => {
    const {
      links: { thumb }
    } = simpleSchema;
    const normalized = SchemaMiller.normalizeOptions(thumb);

    expect(normalized.opts.pin).to.equal(true);
    expect(normalized.opts.plaintext).to.equal(false);
  });

  it("should have resolved use", () => {
    const {
      links: { large, thumb }
    } = simpleSchema;

    const payloadsByName = {
      large: { hash: "abcd" }
    };

    const resolvedOne = SchemaMiller.resolveDependency(large, payloadsByName);
    const resolvedTwo = SchemaMiller.resolveDependency(thumb, payloadsByName);

    expect(resolvedOne.opts.use).to.equal(undefined);
    expect(resolvedTwo.opts.use).to.equal("abcd");
  });
});
