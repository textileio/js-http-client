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
 * Contacts is an API module for managing local contacts and finding contacts on the network
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Contacts extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /**
     * Adds or updates a contact directly, usually from a search
     *
     * @param {object} contact JSON object representing a contact
     * @returns {Promise<string>} address
     */
    add(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPut(`/api/v0/contacts/${info.id}`, undefined, undefined, info);
            return response.data;
        });
    }
    /**
     * Retrieve information about a known contact
     *
     * @param {string} contact ID of the contact
     */
    get(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/contacts/${contact}`);
            return response.data;
        });
    }
    /**
     * Retrieves a list of known contacts
     *
     * @param {string} thread ID of the thread
     */
    list(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('/api/v0/contacts', undefined, { threadId });
            return response.data;
        });
    }
    /**
     * Remove a known contact
     *
     * @param {string} contact ID of the contact
     */
    remove(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendDelete(`/api/v0/contacts/${contactId}`);
        });
    }
    /**
     * Retrieve all threads shared with the given contact
     *
     * @param {string} contact ID of the contact
     */
    // eslint-disable-next-line class-methods-use-this,no-unused-vars
    threads(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new ReferenceError('Not implemented');
        });
    }
    /**
     * Searches locally and on the network for contacts by username, peer id, or address
     *
     * @param {Object} [options] Search options to send as headers
     * @param {string} [options.local] Whether to only search local contacts (default false)
     * @param {string} [options.limit] Stops searching after 'limit' results are found (defaut 5)
     * @param {string} [options.wait] Stops searching after ‘wait’ seconds have elapsed (max 10s, default 5s)
     * @param {string} [options.peer] Search by peer id string
     * @param {string} [options.username] Search by username string
     * @param {string} [options.address] Search by account address string
     * @returns {EventEmitter2} Event emitter with found, done, error events on textile.contacts.
     * The Event emitter has an additional cancel method that can be used to cancel the search.
     * @example
     * const backups = textile.account.search({wait: 5})
     * setTimeout(() => backups.cancel(), 1000) // cancel after 1 second
     * backups.on('textile.contacts.found', found => {
     *   console.log(found)
     * })
     * backups.on('*.done', cancelled => {
     *   console.log(`search was ${cancelled ? 'cancelled' : 'completed'}`)
     * })
     */
    search(options) {
        const { conn, source } = this.sendPostCancelable('/api/v0/contacts/search', undefined, undefined, 
        // TODO: need to convert to normal payload?
        options);
        const emitter = new eventemitter2_1.EventEmitter2({
            wildcard: true
        });
        conn
            .then((response) => {
            const stream = response.data;
            stream.on('data', (chunk) => {
                emitter.emit('textile.contacts.found', chunk);
            });
            stream.on('end', () => {
                emitter.emit('textile.contacts.done', false);
            });
        })
            .catch((err) => {
            if (axios_1.default.isCancel(err)) {
                emitter.emit('textile.contacts.done', true);
            }
            else {
                emitter.emit('textile.contacts.error', err);
            }
        });
        return { emitter, source };
    }
}
exports.default = Contacts;
