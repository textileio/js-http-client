import createHash from 'create-hash'
import createHmac from 'create-hmac'

/**
 * Node style rmd160 + sha256 hash for use in the browser, with native hashing in node.
 *
 * API is the same as hashes in node
 *
 * @param {string} key Secret key
 * @param {string} data Input data
 */
export function hash160 (buffer: string) {
  return createHash('rmd160')
    .update(
      createHash('sha256')
        .update(buffer)
        .digest()
    )
    .digest()
}

/**
 * Node style SHA512 HMAC for use in the browser, with native SHA512 HMAC in node.
 *
 * API is the same as HMACs in node
 *
 * @param {string} key Secret key
 * @param {string} data Input data
 */
export function hmacSHA512 (key: string, data: string) {
  return createHmac('sha512', key)
    .update(data)
    .digest()
}
