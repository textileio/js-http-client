const Connection = require("../core/connection");

// **** Private module methods ****
function encodeValue(val) {
  if (!val) {
    return "";
  }
  return encodeURIComponent(val.toString());
}

/**
 * Create 'args' like a CLI command would take
 *
 * @param {string[]} argsAr An array of arguments
 * @private
 */
function getArgs(argsAr) {
  if (!argsAr || !argsAr.length) {
    return "";
  }
  return argsAr.map(ar => encodeValue(ar)).join(",");
}

/**
 * Create 'options' like a CLI command would take.
 *
 * @param {Object.<string, string>} opts A map of option keys and values
 * @private
 */
function getOpts(opts) {
  if (!opts) {
    return "";
  }
  return Object.keys(opts)
    .map(key => `${key}=${encodeValue(opts[key])}`)
    .join(",");
}

function createHeaders(args, opts, headers) {
  const h = headers || {};
  return {
    ...h,
    "X-Textile-Args": getArgs(args),
    "X-Textile-Opts": getOpts(opts)
  };
}

// **** Private variables
const con = new WeakMap();

/**
 * API is the base class for all SDK modules.
 *
 * @params {ApiOptions] opts API options object
 */
class API {
  constructor(opts) {
    this.opts = opts;
  }

  con() {
    let thisCon = con.get(this);
    if (!thisCon) {
      thisCon = Connection.get(this.opts);
      con.set(this, thisCon);
    }
    return thisCon;
  }

  /**
   * Make a post request to the Textile node
   *
   * @param {string} url The relative URL of the API endpoint
   * @param {string[]} args An array of arguments to pass as Textile args headers
   * @param {Object} opts An object of options to pass as Textile options headers
   * @param {Object} data An object of data to post
   */
  async sendPost(url, args, opts, data, headers) {
    return this.con()({
      method: "post",
      url,
      headers: createHeaders(args, opts, headers),
      data
    });
  }

  /**
   * Make a post request to the Textile node using a multi-part form
   *
   * @param {string} url The relative URL of the API endpoint
   * @param {string[]} args An array of arguments to pass as Textile args headers
   * @param {Object} opts An object of options to pass as Textile options headers
   * @param {Object} data An object of data to post
   */
  async sendPostMultiPart(url, args, opts, data, headers) {
    const h = createHeaders(args, opts, headers);
    if (!h["content-type"]) {
      h["content-type"] = "multipart/form-data";
    }

    return this.con()({
      method: "post",
      url,
      headers: h,
      data
    });
  }

  /**
   * Make a get request to the Textile node
   *
   * @param {string} url The relative URL of the API endpoint
   * @param {string[]} args An array of arguments to pass as Textile args headers
   * @param {Object} opts An object of options to pass as Textile options headers
   */
  async sendGet(url, args, opts, headers) {
    return this.con()({
      method: "get",
      url,
      headers: createHeaders(args, opts, headers)
    });
  }
}

module.exports = API;
