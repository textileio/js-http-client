const toposort = require("toposort");

class SchemaMiller {
  static sortLinksByDependency(links) {
    // Create an array of [ name, dependency ] for sorting
    const linkAndDepends = Object.entries(links).map(([name, link]) => {
      return [name, link.use];
    });

    // Sort the array into an execution order
    const sorted = toposort(linkAndDepends).reverse();

    // Refill the items in the sorted array
    return (
      sorted
        // File is the original form so we don't need a method
        .filter(name => {
          return name !== ":file";
        })
        .map(name => {
          const link = links[name];
          link.name = name;
          return link;
        })
    );
  }

  static normalizeOptions(schemaLink) {
    const opts = schemaLink.opts || {};

    // Check for top level opts
    opts.plaintext = schemaLink.plaintext || opts.plaintext || false;
    opts.pin = schemaLink.pin || opts.pin || false;

    return {
      ...schemaLink,
      opts
    };
  }

  static resolveDependency(method, payloadsByName) {
    let use;

    // Convert 'use' to hash of payload
    if (method.use && method.use !== ":file") {
      // TODO: This is a hack, should use multihash JS lib in future
      if (method.use.length === 46 && method.use.startsWith("Qm")) {
        // eslint-disable-next-line prefer-destructuring
        use = method.use;
      } else {
        use = payloadsByName[method.use].hash;
      }
    }

    const resolvedMethod = {
      ...method
    };
    resolvedMethod.opts = resolvedMethod.opts || {};
    resolvedMethod.opts.use = use || "";
    return resolvedMethod;
  }

  static async mill(payload, node, remoteMill) {
    const payloadsByName = {};

    // Traverse the schema and collect generated files
    if (node.mill) {
      const normal = SchemaMiller.normalizeOptions(node);
      const resolved = SchemaMiller.resolveDependency(normal, {});
      let headers = {};
      let form
      if (resolved.opts.use) {
        form = undefined;
      } else if (typeof payload === "function") {
        form = payload();
      } else {
        form = payload;
      }
      if (form && form.getHeaders) {
        headers = form.getHeaders();
      }
      const milled = await remoteMill(resolved, form, headers);
      payloadsByName[":single"] = milled;
    } else if (node.links) {
      // Determine order
      const steps = SchemaMiller.sortLinksByDependency(node.links);
      // Send each link
      // eslint-disable-next-line no-restricted-syntax
      for (const step of steps) {
        const body = payload;
        let form = null;
        const normal = SchemaMiller.normalizeOptions(step);
        const resolved = SchemaMiller.resolveDependency(normal, payloadsByName);
        let headers = {};

        if (resolved.opts.use) {
          // It's a file. The hash will pass as the payload.
          // Don't send the file again
          form = undefined;
        } else if (typeof body === "function") {
          form = body();
        } else {
          form = body;
        }

        if (form && form.getHeaders) {
          headers = form.getHeaders();
        }

        // Must be synchronous for dependencies
        // eslint-disable-next-line no-await-in-loop
        const milled = await remoteMill(resolved, form, headers);
        payloadsByName[milled.name] = milled;
      }
    }
    return payloadsByName;
  }
}

module.exports = { SchemaMiller };
