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
const api_js_1 = require("../core/api.js");
/**
 * Comments is an API module for managing thread/block comments
 *
 * Comments are added as blocks in a thread, which target another block, usually a file(s).
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Comments extends api_js_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /**
     * Adds a comment to a block
     *
     * @param {string} block Target block ID. Usually a file(s) block.
     * @param {string} body Comment body
     */
    add(block, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPost(`/api/v0/blocks/${block}/comments`, [
                encodeURIComponent(body)
            ]);
            return response.data;
        });
    }
    /**
     * Retrieves a comment by ID
     *
     * @param {string} id ID of the target comment
     */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/blocks/${id}/comment`);
            return response.data;
        });
    }
    /**
     * Retrieves a list of comments on a target block
     *
     * @param {string} block ID of the target block
     */
    list(block) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/blocks/${block}/comments`);
            return response.data;
        });
    }
    /**
     * Ignores a block comment by its ID
     *
     * This adds an 'ignore' thread block targeted at the comment.
     * Ignored blocks are by default not returned when listing.
     *
     * @param {string} id ID of the comment
     */
    ignore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendDelete(`/api/v0/blocks/${id}`);
        });
    }
}
exports.default = Comments;
