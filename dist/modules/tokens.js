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
 * Tokens is an API module for managing Cafe access tokens
 *
 * Tokens allow other peers to register with a Cafe peer. Use this API to create, list, validate,
 * and remove tokens required for access to this Cafe.
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Tokens extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /**
     * Creates an access token
     *
     * Generates an access token (44 random bytes) and saves a bcrypt hashed version for future
     * lookup. The response contains a base58 encoded version of the random bytes token. If the
     * ‘store’ option is set to false, the token is generated, but not stored in the local Cafe
     * db. Alternatively, an existing token can be added using by specifying the ‘token’ option.
     *
     * @param {object} [options] Options for creating tokens
     * @param {string} [options.token] Use an existing token, rather than creating a new one
     * @param {boolean} [options.store] Whether to store the added/generated token to the local db
     * @see Cafes#add
     */
    create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPost(`/api/v0/tokens/`, undefined, options);
            return response.data;
        });
    }
    /**
     * Check validity of existing cafe access token
     *
     * @param {string} token Access token
     */
    validate(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/tokens/${token}`);
            return response.data;
        });
    }
    /** Retrieves information about all stored cafe tokens */
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('/api/v0/tokens');
            return response.data;
        });
    }
    /**
     * Removes an existing cafe token
     *
     * @param {string} token Access token
     */
    remove(token) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendDelete(`/api/v0/tokens/${token}`);
        });
    }
}
exports.default = Tokens;
