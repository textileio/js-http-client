"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../core/api");
/**
 * Config is an API module for controling peer node configuration variables
 *
 * It works much like 'git config'. The configuration values are stored in a config file
 * inside your Textile repository.
 * Getting config values will report the currently active config settings. This may differ from
 * the values specifed when setting values.
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Config extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /**
     * Report the currently active config settings
     *
     * The reported settings may differ from the values specifed when setting/patching values.
     *
     * @param {string} [path] Config settings path (e.g., Addresses.API). Omit for full config file.
     */
    get(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const cleanPath = path ? `/${path.replace(/\./g, ' ')}` : '';
            const response = yield this.sendGet(`api/v0/config${cleanPath}`);
            return response.data;
        });
    }
    /**
     * Replace or update config settings
     *
     * See https://tools.ietf.org/html/rfc6902 for details on RFC6902 JSON patch format.
     * Be sure to restart the daemon for changes to take effect.
     *
     * @param {string} path Config settings path (e.g., Addresses.API).
     * @param {object} value JSON config settings
     */
    set(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: redo with typing
            throw new ReferenceError('Not implemented');
            // const cleanPath = path ? `/${path.replace(/\./g, ' ')}` : ''
            // const patch = [{ op: 'replace', path: cleanPath, value }]
            // this.sendPatch(
            //   `api/v0/config`,
            //   undefined,
            //   undefined,
            //   patch
            // )
        });
    }
}
exports.default = Config;
