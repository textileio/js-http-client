import createHash from 'create-hash'
import createHmac from 'create-hmac'

function hash160 (buffer: string) {
  return createHash('rmd160')
    .update(
      createHash('sha256')
        .update(buffer)
        .digest()
    )
    .digest()
}

function hmacSHA512 (key: string, data: string) {
  return createHmac('sha512', key)
    .update(data)
    .digest()
}

export { hash160, hmacSHA512 }
