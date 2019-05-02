import { API } from '../core/api'
import { FeedItemList } from '../models'

export type FeedModes = 'chrono' | 'annotated' | 'stacks'

/**
 * Feed is an API module for paginating post and annotation block types
 *
 * @extends API
 */
export default class Feed extends API {
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
   * @param thread Thread ID (can also use ‘default’)
   * @param offset Offset ID to start listing from (omit for latest)
   * @param limit List page size (default: 5)
   * @param mode Feed mode (one of 'chrono’, 'annotated’, or ‘stacks’)
   */
  async get(thread?: string, offset?: string, limit?: number, mode?: FeedModes) {
    const response = await this.sendGet(
      'feed',
      undefined,
      {
        thread: thread || '',
        offset: offset || '',
        limit: limit || 5,
        mode: mode || 'chrono'
      }
    )
    return response.json() as Promise<FeedItemList>
  }
}
