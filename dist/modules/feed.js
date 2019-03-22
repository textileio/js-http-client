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
 * Feed is an API module for paginating post and annotation block types
 *
 * @param {Object} opts Connection options object
 * @param {string} opts.url
 * @extends API
 */
class Feed extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /**
     * Retrieves post (join|leave|files|message) and annotation (comment|like) block type
     *
     * The mode option dictates how the feed is displayed:
     * * chrono: All feed block types are shown. Annotations always nest their target post,
     * i.e., the post a comment is about.
     * * annotated: Annotations are nested under post targets, but are not shown in the
     * top-level feed.
     * * stacks: Related blocks are chronologically grouped into 'stacks'. A new stack is
     * started if an unrelated block breaks continuity. This mode is used by Textile Photos.
     * Stacks may include:
     *   * The initial post with some nested annotations. Newer annotations may have already been
     * listed.
     *   * One or more annotations about a post. The newest annotation assumes the 'top' position in
     * the stack. Additional annotations are nested under the target.
     *   * Newer annotations may have already been listed in the case as well.
     *
     * @param {Object} options Additional options to send as headers
     * @param {string} options.thread Thread ID (can also use ‘default’)
     * @param {string} options.offset Offset ID to start listing from (omit for latest)
     * @param {string} options.limit List page size (default: 5)
     * @param {string} options.mode Feed mode (one of 'chrono’, 'annotated’, or ‘stacks’)
     */
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPost('/api/v0/feed', undefined, undefined, options);
            return response.data;
        });
    }
}
exports.default = Feed;
