const nacl = require("tweetnacl");
const { sign, verify } = require("./signing");
const { StrKey } = require("./strkey");

/**
 * `Keypair` represents public (and secret) keys of the account.
 *
 * Currently `Keypair` only supports ed25519 but in a future this class can be abstraction layer for other
 * public-key signature systems.
 *
 * Use more convenient methods to create `Keypair` object:
 * * `{@link Keypair.fromPublicKey}`
 * * `{@link Keypair.fromSecret}`
 * * `{@link Keypair.random}`
 *
 * Copyright (c) 2015-2018 Stellar Development Foundation
 *
 * @constructor
 * @param {object} keys At least one of keys must be provided.
 * @param {string} keys.type Public-key signature system name. (currently only `ed25519` keys are supported)
 * @param {Buffer} [keys.publicKey] Raw public key
 * @param {Buffer} [keys.secretKey] Raw secret key (32-byte secret seed in ed25519`)
 */
class Keypair {
  constructor(keys) {
    if (keys.type !== "ed25519") {
      throw new Error("Invalid keys type");
    }

    this.type = keys.type;

    if (keys.secretKey) {
      const secretKey = Buffer.from(keys.secretKey);

      if (secretKey.length !== 32) {
        throw new Error("secretKey length is invalid");
      }

      const secretKeyUint8 = new Uint8Array(secretKey);
      const naclKeys = nacl.sign.keyPair.fromSeed(secretKeyUint8);

      this.secretSeed = secretKey;
      this.secretKey = Buffer.from(naclKeys.secretKey);
      this.pubKey = Buffer.from(naclKeys.publicKey);

      if (keys.publicKey && !this.pubKey.equals(Buffer.from(keys.publicKey))) {
        throw new Error("secretKey does not match publicKey");
      }
    } else {
      this.pubKey = Buffer.from(keys.publicKey);

      if (this.pubKey.length !== 32) {
        throw new Error("publicKey length is invalid");
      }
    }
  }

  /**
   * Creates a new `Keypair` instance from secret. This can either be secret key or secret seed depending
   * on underlying public-key signature system. Currently `Keypair` only supports ed25519.
   * @param {string} secret secret key (ex. `SDAKFNYEIAORZKKCYRILFQKLLOCNPL5SWJ3YY5NM3ZH6GJSZGXHZEPQS`)
   * @returns {Keypair}
   */
  static fromSecret(secret) {
    const rawSecret = StrKey.decodeEd25519SecretSeed(secret);
    return this.fromRawEd25519Seed(rawSecret);
  }

  /**
   * Creates a new `Keypair` object from ed25519 secret key seed raw bytes.
   *
   * @param {Buffer} rawSeed Raw 32-byte ed25519 secret key seed
   * @returns {Keypair}
   */
  static fromRawEd25519Seed(rawSeed) {
    return new this({ type: "ed25519", secretKey: rawSeed });
  }

  /**
   * Creates a new `Keypair` object from public key.
   * @param {string} publicKey public key (ex. `GB3KJPLFUYN5VL6R3GU3EGCGVCKFDSD7BEDX42HWG5BWFKB3KQGJJRMA`)
   * @returns {Keypair}
   */
  static fromPublicKey(publicKey) {
    const decodedKey = StrKey.decodeEd25519PublicKey(publicKey);
    if (decodedKey.length !== 32) {
      throw new Error("Invalid Stellar public key");
    }
    return new this({ type: "ed25519", decodedKey });
  }

  /**
   * Create a random `Keypair` object.
   * @returns {Keypair}
   */
  static random() {
    const secret = nacl.randomBytes(32);
    return this.fromRawEd25519Seed(secret);
  }

  /**
   * Returns raw public key
   * @returns {Buffer}
   */
  rawPublicKey() {
    return this.pubKey;
  }

  /**
   * Returns base58-encoded public key associated with this `Keypair` object.
   * @returns {string}
   */
  publicKey() {
    return StrKey.encodeEd25519PublicKey(this.pubKey);
  }

  /**
   * Returns base58-encoded secret key associated with this `Keypair` object
   * @returns {string}
   */
  secret() {
    if (!this.secretSeed) {
      throw new Error("no secret key available");
    }

    if (this.type === "ed25519") {
      return StrKey.encodeEd25519SecretSeed(this.secretSeed);
    }

    throw new Error("Invalid Keypair type");
  }

  /**
   * Returns raw secret key.
   * @returns {Buffer}
   */
  rawSecretKey() {
    return this.secretSeed;
  }

  /**
   * Returns `true` if this `Keypair` object contains secret key and can sign.
   * @returns {boolean}
   */
  canSign() {
    return !!this.secretKey;
  }

  /**
   * Signs data.
   * @param {Buffer} data Data to sign
   * @returns {Buffer}
   */
  sign(data) {
    if (!this.canSign()) {
      throw new Error("cannot sign: no secret key available");
    }

    return sign(data, this.secretKey);
  }

  /**
   * Verifies if `signature` for `data` is valid.
   * @param {Buffer} data Signed data
   * @param {Buffer} signature Signature
   * @returns {boolean}
   */
  verify(data, signature) {
    return verify(data, signature, this.pubKey);
  }
}

module.exports = { Keypair };
