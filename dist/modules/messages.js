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
 * Messages is an API module for managing thread/block messages
 *
 * Messages are added as blocks in a thread
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Messages extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /**
     * Adds a message to a thread
     *
     * @param {string} thread Thread ID
     * @param {string} body Message body
     */
    add(thread, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPost(`/api/v0/threads/${thread}/messages`, [
                encodeURIComponent(body)
            ]);
            return response.data;
        });
    }
    /**
     * Retrieves a message by block ID
     *
     * @param {string} id ID of the target message
     */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/messages/${id}`);
            return response.data;
        });
    }
    /**
     * Retrieves thread messages
     *
     * @param {Object} [options] Options to send as headers
     * @param {string} [options.thread] Thread ID (can also use ‘default’)
     * @param {string} [options.offset] Offset ID to start listing from (omit for latest)
     * @param {string} [options.limit] List page size (default: 5)
     */
    list(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('/api/v0/messages', undefined, options);
            return response.data;
        });
    }
    /**
     * Ignores a thread message by its ID
     *
     * This adds an 'ignore' thread block targeted at the comment.
     * Ignored blocks are by default not returned when listing.
     *
     * @param {string} id ID of the message
     */
    ignore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendDelete(`/api/v0/blocks/${id}`);
        });
    }
}
exports.default = Messages;
