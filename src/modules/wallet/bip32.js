const ecc = require("tiny-secp256k1");
const crypto = require("../../helpers/crypto");

const HIGHEST_BIT = 0x80000000;

/**
 * `BIP32` represents a BIP32-compatible hierarchical deterministic wallet (or "HD Wallet").
 *
 * BIP32 wallets are crypto-wallets which can be shared partially or entirely with different
 * systems, each with or without the ability to access coins/data. This implementation is based
 * on a derivation (and extraction for modularity) of the HDWallet/HDNode written and tested
 * by bitcoinjs-lib contributors since 2014.
 *
 * Copyright (c) 2011-2018 bitcoinjs-lib contributors
 *
 * @constructor
 * @param {Buffer} [privateKey] The account's private key
 * @param {Buffer} [publicKey] The account's public key
 * @param {Buffer} chaincode The chain code
 */
class BIP32 {
  constructor(d, Q, chainCode) {
    this.d = d || null;
    this.Q = Q || null;

    this.chainCode = chainCode;
    this.depth = 0;
    this.index = 0;
    this.parentFingerprint = 0x00000000;
  }

  get identifier() {
    return crypto.hash160(this.publicKey);
  }

  get fingerprint() {
    return this.identifier.slice(0, 4);
  }

  get privateKey() {
    return this.d;
  }

  get publicKey() {
    if (!this.Q) {
      this.Q = ecc.pointFromScalar(this.d, this.compressed);
    }
    return this.Q;
  }

  // Private === not neutered
  // Public === neutered
  isNeutered() {
    return this.d === null;
  }

  neutered() {
    const neutered = this.fromPublicKey(this.publicKey, this.chainCode);
    neutered.depth = this.depth;
    neutered.index = this.index;
    neutered.parentFingerprint = this.parentFingerprint;
    return neutered;
  }

  // https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#child-key-derivation-ckd-functions
  derive(index) {
    const isHardened = index >= HIGHEST_BIT;
    const data = Buffer.allocUnsafe(37);

    // Hardened child
    if (isHardened) {
      if (this.isNeutered())
        throw new TypeError("Missing private key for hardened child key");

      // data = 0x00 || ser256(kpar) || ser32(index)
      data[0] = 0x00;
      this.privateKey.copy(data, 1);
      data.writeUInt32BE(index, 33);

      // Normal child
    } else {
      // data = serP(point(kpar)) || ser32(index)
      //      = serP(Kpar) || ser32(index)
      this.publicKey.copy(data, 0);
      data.writeUInt32BE(index, 33);
    }

    const I = crypto.hmacSHA512(this.chainCode, data);
    const IL = I.slice(0, 32);
    const IR = I.slice(32);

    // if parse256(IL) >= n, proceed with the next value for i
    if (!ecc.isPrivate(IL)) return this.derive(index + 1);

    // Private parent key -> private child key
    let hd;
    if (!this.isNeutered()) {
      hd = BIP32.fromPrivateKey(IL, IR);
      // Public parent key -> public child key
    } else {
      hd = BIP32.fromPublicKey(IL, IR);
    }

    hd.depth = this.depth + 1;
    hd.index = index;
    hd.parentFingerprint = this.fingerprint.readUInt32BE(0);
    return hd;
  }

  deriveHardened(index) {
    // Only derives hardened private keys by default
    return this.derive(index + HIGHEST_BIT);
  }

  derivePath(path) {
    let splitPath = path.split("/");
    if (splitPath[0] === "m") {
      if (this.parentFingerprint)
        throw new TypeError("Expected master, got child");

      splitPath = splitPath.slice(1);
    }

    return splitPath.reduce((prevHd, indexStr) => {
      let index;
      if (indexStr.slice(-1) === "'") {
        index = parseInt(indexStr.slice(0, -1), 10);
        return prevHd.deriveHardened(index);
      }
      index = parseInt(indexStr, 10);
      return prevHd.derive(index);
    }, this);
  }

  sign(hash) {
    return ecc.sign(hash, this.privateKey);
  }

  verify(hash, signature) {
    return ecc.verify(hash, this.publicKey, signature);
  }

  static fromPrivateKey(privateKey, chainCode) {
    if (!ecc.isPrivate(privateKey))
      throw new TypeError("Private key not in range [1, n)");
    return new this(privateKey, null, chainCode);
  }

  static fromPublicKey(publicKey, chainCode) {
    // verify the X coordinate is a point on the curve
    if (!ecc.isPoint(publicKey))
      throw new TypeError("Point is not on the curve");
    return new this(null, publicKey, chainCode);
  }

  static fromSeed(seed) {
    if (seed.length < 16)
      throw new TypeError("Seed should be at least 128 bits");
    if (seed.length > 64)
      throw new TypeError("Seed should be at most 512 bits");

    const I = crypto.hmacSHA512("Bitcoin seed", seed);
    const IL = I.slice(0, 32);
    const IR = I.slice(32);

    return this.fromPrivateKey(IL, IR);
  }
}

module.exports = { BIP32 };
