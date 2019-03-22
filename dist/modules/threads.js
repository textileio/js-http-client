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
 * Threads is an API module for managing Textile threads
 *
 * @param {Object} opts Connection options object
 * @param {string} opts.url
 * @extends API
 */
class Threads extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /**
     * Adds and joins a new thread
     *
     * @param {string} name The name of the new thread
     * @param {Object} [options] Additional options to send as headers
     * @param {string} [options.key] A locally unique key used by an app to identify this thread on
     * recovery
     * @param {string} [options.type] The type of thread, must be one of 'private' (default),
     * 'readonly', 'public', or 'open'
     * @param {string} [options.sharing] The sharing style of thread, must be one of 'notshared'
     * (default), 'inviteonly', or 'shared'
     * @param {string[]} [options.members] An array of contact addresses. When supplied, the thread
     * will not allow additional peers, useful for 1-1 chat/file sharing or private groups.
     * @param {string} [options.schema] Schema ID for the new thread
     * @example
     * await textile.thread.add('MyMedia', {
     *   schema: mediaSchema.id,
     *   type: 'open',
     *   sharing: 'shared'
     * })
     */
    add(name, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPost('/api/v0/threads', [name], undefined, options);
            return response.data;
        });
    }
    /**
     * Adds or updates a thread directly, usually from a backup
     *
     * @param {string} thread ID of the thread
     * @param {object} info Thread object
     */
    addOrUpdate(thread, info) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendPut(`/api/v0/threads/${thread}`, undefined, undefined, info);
        });
    }
    /**
     * Retrieve a thread by ID
     *
     * @param {string} thread ID of the thread
     */
    get(thread) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/threads/${thread}`);
            return response.data;
        });
    }
    /** Retrieves a list of threads */
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('/api/v0/threads');
            return response.data;
        });
    }
    /**
     * Remove a thread by ID
     *
     * @param {string} thread ID of the thread
     */
    remove(thread) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendDelete(`/api/v0/threads/${thread}`);
        });
    }
    /** Gets information about the default thread (if selected) */
    default() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('/api/v0/threads/default');
            return response.data;
        });
    }
    /**
     * List all peers in a thread
     *
     * @param {string} thread ID of the thread. Omit for default.
     */
    peers(thread) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/threads/${thread || 'default'}/peers`);
            return response.data;
        });
    }
}
exports.default = Threads;
