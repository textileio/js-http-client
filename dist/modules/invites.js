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
 * Invites is an API module for managing thread invites
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Invites extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /**
     * Accept an invite to a thread
     *
     * @param {string} invite Invite ID
     * @param {string} key Key for an external invite
     */
    accept(invite, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPost(`/api/v0/invites/${invite}/accept`, undefined, { key });
            return response.data;
        });
    }
    /**
     * Create a peer-to-peer or external invite to a thread
     *
     * @param {string} thread Thread ID (can also use ‘default’)
     * @param {string} [peer] Peer ID (omit to create an external invite)
     */
    create(thread, peer) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPost(`/api/v0/invites/`, undefined, {
                thread,
                peer
            });
            return response.data;
        });
    }
    /** Lists all pending thread invites */
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('/api/v0/invites');
            return response.data;
        });
    }
    /**
     * Ignore a direct invite to a thread
     *
     * @param {string} id ID of the invite
     */
    ignore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendPost(`/api/v0/invites/${id}/ignore`);
        });
    }
}
exports.default = Invites;
