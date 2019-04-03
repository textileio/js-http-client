import nacl from 'tweetnacl'
import { sign, verify } from './signing'
import { StrKey } from './strkey'

/**
 * `Keypair` represents public (and secret) keys of the account.
 *
 * Currently `Keypair` only supports ed25519 but in a future this class can be an abstraction
 * layer for other public-key signature systems.
 *
 * Copyright (c) 2015-2018 Stellar Development Foundation
 */
export class Keypair {
  /**
   * Creates a new `Keypair` instance from secret. This can either be secret key or secret seed depending
   * on underlying public-key signature system. Currently `Keypair` only supports ed25519.
   * @param secret secret key (ex. `SDAKFNYEIAORZKKCYRILFQKLLOCNPL5SWJ3YY5NM3ZH6GJSZGXHZEPQS`)
   */
  static fromSecret(secret: string) {
    const rawSecret = StrKey.decodeEd25519SecretSeed(secret)
    return this.fromRawEd25519Seed(rawSecret)
  }

  /**
   * Creates a new `Keypair` object from ed25519 secret key seed raw bytes.
   *
   * @param rawSeed Raw 32-byte ed25519 secret key seed
   */
  static fromRawEd25519Seed(rawSeed: Buffer) {
    return new this(rawSeed, 'ed25519')
  }

  /**
   * Create a random `Keypair` object.
   */
  static random() {
    const secret = nacl.randomBytes(32)
    return this.fromRawEd25519Seed(Buffer.from(secret))
  }

  pubKey: Buffer
  seed: Buffer
  privKey: Buffer
  type: 'ed25519'

  /**
   * Constructor
   * @param secretKey Raw secret key (32-byte secret seed in ed25519`)
   * @param type Public-key signature system name. (currently only `ed25519` keys are supported)
   */
  constructor(secretKey: Buffer, type?: 'ed25519') {
    if (type !== 'ed25519') {
      throw new Error('Invalid keys type')
    }
    this.type = type || 'ed25519'

    const secret = Buffer.from(secretKey)

    if (secret.length !== 32) {
      throw new Error('secretKey length is invalid')
    }
    const naclKeys = nacl.sign.keyPair.fromSeed(new Uint8Array(secret))

    this.seed = secret
    this.privKey = Buffer.from(naclKeys.secretKey)
    this.pubKey = Buffer.from(naclKeys.publicKey)
  }

  /**
   * Returns raw public key
   */
  rawPublicKey() {
    return this.pubKey
  }

  /**
   * Returns base58-encoded public key associated with this `Keypair` object.
   */
  publicKey() {
    return StrKey.encodeEd25519PublicKey(this.pubKey)
  }

  /**
   * Returns base58-encoded secret key associated with this `Keypair` object
   */
  secret() {
    if (this.type !== 'ed25519') {
      throw new Error('Invalid Keypair type')
    }
    return StrKey.encodeEd25519SecretSeed(this.seed)
  }

  /**
   * Returns raw secret key.
   */
  rawSecretKey() {
    return this.seed
  }

  /**
   * Returns `true` if this `Keypair` object contains secret key and can sign.
   */
  canSign() {
    return !!this.privKey
  }

  /**
   * Signs data.
   * @param data Data to sign
   */
  sign(data: Buffer) {
    if (!this.canSign()) {
      throw new Error('cannot sign: no secret key available')
    }
    return sign(data, this.privKey)
  }

  /**
   * Verifies if `signature` for `data` is valid.
   * @param data Signed data
   * @param signature Signature
   */
  verify(data: Buffer, signature: Buffer) {
    return verify(data, signature, this.pubKey)
  }
}
