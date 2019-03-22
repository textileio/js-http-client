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
const eventemitter2_1 = require("eventemitter2");
const axios_1 = __importDefault(require("axios"));
const api_1 = require("../core/api");
/**
 * Account is an API module for managing a wallet account
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Account extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /**
     * Retrieve the local wallet account address
     *
     * @returns {Promise<string>} address
     */
    address() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('/api/v0/account/address');
            return response.data;
        });
    }
    /**
     * Retrieve the local wallet account seed
     *
     * @returns {Promise<string>} seed
     */
    // eslint-disable-next-line class-methods-use-this
    seed() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new ReferenceError('Not implemented');
        });
    }
    /**
     * Encrypts input with account address
     *
     * @param {Buffer} input Input plaintext Buffer data
     * @returns {Promise<Buffer>} ciphertext
     */
    // eslint-disable-next-line class-methods-use-this,no-unused-vars
    encrypt(input) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new ReferenceError('Not implemented');
        });
    }
    /**
     * Decrypts input with account address
     *
     * @param {Buffer} input Input ciphertext Buffer data
     * @returns {Promise<Buffer>} plaintext
     */
    // eslint-disable-next-line class-methods-use-this,no-unused-vars
    decrypt(input) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new ReferenceError('Not implemented');
        });
    }
    /** Lists all known wallet account peers */
    peers() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('/api/v0/account/peers');
            return response.data;
        });
    }
    /**
     * Searches the network for wallet account thread backups
     *
     * Returns streaming connection and a cancel function to cancel the request.
     *
     * @param {number} wait Stops searching after 'wait' seconds have elapsed (max 10s, default 2s)
     * @returns {EventEmitter2} Event emitter with found, done, error events on textile.backups.
     * The Event emitter has an additional cancel method that can be used to cancel the search.
     * @example
     * const backups = textile.account.findThreadBackups()
     * setTimeout(() => backups.cancel(), 1000) // cancel after 1 second
     * backups.on('textile.backups.found', found => {
     *   console.log(found)
     * })
     * backups.on('*.done', cancelled => {
     *   console.log(`search was ${cancelled ? 'cancelled' : 'completed'}`)
     * })
     */
    findThreadBackups(wait) {
        const { conn, source } = this.sendPostCancelable('/api/v0/account/backups', undefined, { wait });
        const emitter = new eventemitter2_1.EventEmitter2({
            wildcard: true
        });
        conn
            // TODO: Is that right type?
            .then((response) => {
            const stream = response.data;
            // TODO: Is that right type?
            stream.on('data', (chunk) => {
                emitter.emit('textile.backups.data', chunk);
            });
            stream.on('end', () => {
                emitter.emit('textile.backups.done', false);
            });
        })
            .catch((err) => {
            if (axios_1.default.isCancel(err)) {
                emitter.emit('textile.backups.done', true);
            }
            else {
                emitter.emit('textile.backups.error', err);
            }
        });
        return { emitter, source };
    }
}
exports.default = Account;
