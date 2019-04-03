import createHash from 'create-hash'
import createHmac from 'create-hmac'

/**
 * Node style rmd160 + sha256 hash for use in the browser, with native hashing in node.
 *
 * API is the same as hashes in node
 *
 * @param key Secret key
 * @param data Input data
 */
export function hash160(buffer: string | Buffer) {
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
 * @param key Secret key
 * @param data Input data
 */
export function hmacSHA512(key: string | Buffer, data: string | Buffer) {
  return createHmac('sha512', key)
    .update(data)
    .digest()
}
