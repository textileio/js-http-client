"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const url_1 = require("url");
/**
 * The connection module contains utilities for creating connections to a Textile node
 */
class Connection {
    /**
     * get() coerces the given options into a connection
     */
    static get(options) {
        const opts = Connection.cleanOpts(options);
        const url = new url_1.URL(opts.url);
        if (opts.port) {
            url.port = opts.port;
        }
        return axios_1.default.create({
            baseURL: url.toString()
        });
    }
    static cleanOpts(options) {
        const opts = options || {};
        opts.url = opts.url || 'http://127.0.0.1';
        opts.port = opts.port || '40600';
        return opts;
    }
}
exports.default = Connection;
