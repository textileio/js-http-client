import { API } from '../core/api'
import { ApiOptions } from '../models/index'
import pb from '@textile/go-mobile'

/**
 * Feed is an API module for paginating post and annotation block types
 *
 * @param {Object} opts Connection options object
 * @param {string} opts.url
 * @extends API
 */
export default class Feed extends API {
  opts: ApiOptions
  constructor(opts: ApiOptions) {
    super(opts)
    this.opts = opts
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
  async get(options: pb.IFeedRequest) {
    const response = await this.sendPost(
      '/api/v0/feed',
      undefined,
      undefined,
      options
    )
    return response.data
  }
}
