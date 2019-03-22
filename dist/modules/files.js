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
const api_js_1 = require("../core/api.js");
const mills_1 = __importDefault(require("./mills"));
const threads_1 = __importDefault(require("./threads"));
/**
 * Files is an API module for managing Textile files
 *
 * @param {ApiOptions} API options object
 * @extends {API}
 */
class Files extends api_js_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
        this.mills = new mills_1.default(opts);
        this.threads = new threads_1.default(opts);
    }
    /**
     * Retrieves a thread file by block ID
     *
     * @param {string} id ID of the target file
     */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/files/${id}`);
            return response.data;
        });
    }
    /**
     * Get a paginated array of files.
     *
     * @param {object} [options] Options for pagination and filtering
     * @param {string} [options.thread] Thread ID (can also use ‘default’). Omit for all
     * @param {string} [options.offset] Offset ID to start listing from. Omit for latest
     * @param {number} [options.limit=5] List page size
     */
    // TODO: Is there a type for this list request?
    list(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('api/v0/files', undefined, options);
            return response.data;
        });
    }
    /**
     * Retrieves file encryption/decryption keys under the given target
     *
     * Note that the target id is _not_ the same as the block id. The target is the actual target
     * file object.
     *
     * @param {string} target ID of the target file
     */
    keys(target) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/keys/${target}`);
            return response.data;
        });
    }
    /**
     * Ignores a thread file by its block ID
     *
     * This adds an 'ignore' thread block targeted at the file.
     * Ignored blocks are by default not returned when listing.
     *
     * @param {string} id ID of the thread file
     */
    ignore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendDelete(`/api/v0/blocks/${id}`);
        });
    }
    /**
     * Add a file to a thread in your Textile node
     *
     * @param {string} thread Id of the thread
     * @param {File} file A FormData object or a function for creating a FormData object
     * @param {string} caption Caption to add
     */
    addFile(threadId, file, caption) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: redo with typing
            throw new ReferenceError('Not implemented');
            // // TODO: Make thread optional and default to 'default'
            // if (!threadId) {
            //   throw new Error(
            //     'threadId must be provided when adding files to a thread'
            //   )
            // }
            // const opts = {
            //   schema_node: pb.Thread
            //  }
            // // Fetch schema (will throw if it doesn't have a schema node)
            // opts.schema_node = (await this.threads.get(threadId)).schema_node
            // // Mill the file(s) before adding it
            // const files = await SchemaMiller.mill(
            //   file,
            //   opts.schema_node,
            //   async (link, form, headers) => {
            //     const { data: res } = await this.mills.run(
            //       link.mill,
            //       link.opts,
            //       form,
            //       headers
            //     )
            //     res.name = link.name
            //     return res
            //   }
            // )
            // const resp = await this.sendPost(
            //   `api/v0/threads/${threadId}/files`,
            //   undefined,
            //   opts,
            //   // TODO: Create proper DirectoryList and Directory object definitions
            //   { items: [{ files }] }
            //   // { 'Content-Type': 'application/json' }
            // )
            // return resp.data
        });
    }
}
exports.default = Files;
