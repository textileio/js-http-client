import nacl from 'tweetnacl'

/**
 * Signs the message using the secret key and returns a signed message
 * @param data the message to sign
 * @param secretKey the secret key to use for signing
 */
export function sign(data: Buffer, secretKey: Buffer) {
  const newData = new Uint8Array(Buffer.from(data).toJSON().data)
  const newSecretKey = new Uint8Array(secretKey.toJSON().data)
  const signature = nacl.sign.detached(newData, newSecretKey)
  return Buffer.from(signature)
}

/**
 * Verifies the signature for the message.
 * @param data the message for which to verify the signature
 * @param signature the signature applied ot the message
 * @param publicKey the public key of the signer
 */
export function verify(data: Buffer, signature: Buffer, publicKey: Buffer) {
  const newData = new Uint8Array(Buffer.from(data).toJSON().data)
  const newSignature = new Uint8Array(signature.toJSON().data)
  const newPublicKey = new Uint8Array(publicKey.toJSON().data)
  return nacl.sign.detached.verify(newData, newSignature, newPublicKey)
}
