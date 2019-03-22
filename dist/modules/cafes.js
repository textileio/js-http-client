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
 * Cafes is an API module for managing Cafe access, messages, and services
 *
 * Cafes are other peers on the network who offer pinning, backup, and inbox services.
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Cafes extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /**
     * Registers with a cafe and saves an expiring service session token
     *
     * An access token is required to register, and should be obtained separately from the target
     * Cafe.
     *
     * @param {string} cafe The host Cafe public url
     * @param {string} token An access token supplied by the target Cafe
     * @see Tokens#create
     */
    add(cafe, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPost(`/api/v0/cafes/`, [cafe], { token });
            return response.data;
        });
    }
    /**
     * Retrieves information about a cafe session
     *
     * @param {string} id ID of the target Cafe
     */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/cafes/${id}`);
            return response.data;
        });
    }
    /** Retrieves information about all active cafe sessions */
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('/api/v0/cafes');
            return response.data;
        });
    }
    /** Checkes for messages at all cafes.
     *
     * New messages are downloaded and processed opportunistically.
     */
    checkMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendPost('/api/v0/cafes/messages');
        });
    }
    /**
     * Deregisters with a cafe and removes local session data
     *
     * Note: pinned content will expire based on the Cafe’s service rules.
     *
     * @param {string} id ID of the target Cafe
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendDelete(`/api/v0/cafes/${id}`);
        });
    }
}
exports.default = Cafes;
