"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const connection_1 = __importDefault(require("./connection"));
const { CancelToken } = axios_1.default;
// **** Private module methods ****
const encodeValue = (val) => {
    // TODO: is this what you really want when 'false'?
    if (!val) {
        return '';
    }
    return encodeURIComponent(val.toString());
};
/**
 * Create 'args' like a CLI command would take
 *
 * @param {string[]} argsAr An array of arguments
 * @private
 */
const getArgs = (argsAr) => {
    if (!argsAr || !argsAr.length) {
        return '';
    }
    return argsAr.map((ar) => encodeValue(ar)).join(',');
};
/**
 * Create 'options' like a CLI command would take.
 *
 * @param {Object.<string, string>} opts A map of option keys and values
 * @private
 */
const getOpts = (opts) => {
    if (!opts) {
        return '';
    }
    return Object.keys(opts)
        .map((key) => `${key}=${encodeValue(opts[key])}`)
        .join(',');
};
const createHeaders = (args, opts, headers) => {
    const h = headers || {};
    return Object.assign({}, h, { 'X-Textile-Args': getArgs(args), 'X-Textile-Opts': getOpts(opts) });
};
/**
 * A request and associated cancel function
 * @typedef {object} CancelableRequest
 * @property {object} conn A Connection object
 * @property {function(string):void} cancel A cancel function
 */
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
            thisCon = connection_1.default.get(this.opts);
            con.set(this, thisCon);
        }
        return thisCon;
    }
    /**
     * Make a post request to the Textile node that is cancelable
     *
     * @param {string} url The relative URL of the API endpoint
     * @param {string[]} args An array of arguments to pass as Textile args headers
     * @param {Object} opts An object of options to pass as Textile options headers
     * @param {Object} data An object of data to post
     * @returns {CancelableRequest} request
     */
    sendPostCancelable(url, args, opts, data, headers) {
        const source = axios_1.default.CancelToken.source();
        const conn = this.con()({
            method: 'post',
            url,
            headers: createHeaders(args, opts, headers),
            data,
            cancelToken: source.token
        });
        // TODO: fix cancel method return
        // ISSUE: Cancel method above isn't set by time of return
        // RETURN: { conn, cancel }
        return { conn, source };
    }
    /**
     * Make a post request to the Textile node
     *
     * @param {string} url The relative URL of the API endpoint
     * @param {string[]} args An array of arguments to pass as Textile args headers
     * @param {Object} opts An object of options to pass as Textile options headers
     * @param {Object} data An object of data to post
     */
    sendPost(url, args, opts, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.con()({
                method: 'post',
                url,
                headers: createHeaders(args, opts, headers),
                data
            });
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
    sendPostMultiPart(url, args, opts, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            const h = createHeaders(args, opts, headers);
            if (!h['content-type']) {
                h['content-type'] = 'multipart/form-data';
            }
            return this.con()({
                method: 'post',
                url,
                headers: h,
                data
            });
        });
    }
    /**
     * Make a get request to the Textile node
     *
     * @param {string} url The relative URL of the API endpoint
     * @param {string[]} args An array of arguments to pass as Textile args headers
     * @param {Object} opts An object of options to pass as Textile options headers
     */
    sendGet(url, args, opts, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.con()({
                method: 'get',
                url,
                headers: createHeaders(args, opts, headers)
            });
        });
    }
    /**
     * Make a delete request to the Textile node
     *
     * @param {string} url The relative URL of the API endpoint
     * @param {string[]} args An array of arguments to pass as Textile args headers
     * @param {Object} opts An object of options to pass as Textile options headers
     */
    sendDelete(url, args, opts, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.con()({
                method: 'delete',
                url,
                headers: createHeaders(args, opts, headers)
            });
        });
    }
    /**
     * Make a put request to the Textile node
     *
     * @param {string} url The relative URL of the API endpoint
     * @param {string[]} args An array of arguments to pass as Textile args headers
     * @param {Object} opts An object of options to pass as Textile options headers
     * @param {Object} data An object of data to put
     */
    sendPut(url, args, opts, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.con()({
                method: 'put',
                url,
                headers: createHeaders(args, opts, headers),
                data
            });
        });
    }
}
exports.API = API;
