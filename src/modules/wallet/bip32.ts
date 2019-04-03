import ecc from 'tiny-secp256k1'
import { hash160, hmacSHA512 } from '../../helpers/crypto'

const HIGHEST_BIT = 0x80000000

/**
 * `BIP32` represents a BIP32-compatible hierarchical deterministic wallet (or 'HD Wallet').
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
export class BIP32 {
  static fromPrivateKey(privateKey: Buffer, chainCode: Buffer) {
    if (!ecc.isPrivate(privateKey)) {
      throw new TypeError('Private key not in range [1, n)')
    }
    return new this(privateKey, chainCode)
  }

  static fromSeed(seed: string) {
    if (seed.length < 16) {
      throw new TypeError('Seed should be at least 128 bits')
    }
    if (seed.length > 64) {
      throw new TypeError('Seed should be at most 512 bits')
    }

    const I = hmacSHA512('Bitcoin seed', seed)
    const IL = I.slice(0, 32)
    const IR = I.slice(32)

    return BIP32.fromPrivateKey(IL, IR)
  }

  d: Buffer
  Q: Buffer
  chainCode: Buffer
  depth: number
  index: number
  parentFingerprint: number

  constructor(privateKey: Buffer, chainCode: Buffer) {
    this.d = privateKey
    const publicKey = ecc.pointFromScalar(this.d)
    if (publicKey === null) {
      throw new TypeError('Unable to derive public key from private key')
    }
    this.Q = publicKey

    this.chainCode = chainCode
    this.depth = 0
    this.index = 0
    this.parentFingerprint = 0x00000000
  }

  get identifier() {
    return hash160(this.publicKey)
  }

  get fingerprint() {
    return this.identifier.slice(0, 4)
  }

  get privateKey() {
    return this.d
  }

  get publicKey() {
    return this.Q
  }

  // https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#child-key-derivation-ckd-functions
  derive(index: number): BIP32 {
    const isHardened = index >= HIGHEST_BIT
    const data = Buffer.allocUnsafe(37)

    // Hardened child
    if (isHardened) {
      // data = 0x00 || ser256(kpar) || ser32(index)
      data[0] = 0x00
      this.privateKey.copy(data, 1)
      data.writeUInt32BE(index, 33)

      // Normal child
    } else {
      // data = serP(point(kpar)) || ser32(index)
      //      = serP(Kpar) || ser32(index)
      this.publicKey.copy(data, 0)
      data.writeUInt32BE(index, 33)
    }

    const I = hmacSHA512(this.chainCode, data)
    const IL = I.slice(0, 32)
    const IR = I.slice(32)

    // if parse256(IL) >= n, proceed with the next value for i
    if (!ecc.isPrivate(IL)) {
      return this.derive(index + 1)
    }

    // Private parent key -> private child key
    // or
    // Public parent key -> public child key
    const hd = BIP32.fromPrivateKey(IL, IR)

    hd.depth = this.depth + 1
    hd.index = index
    hd.parentFingerprint = this.fingerprint.readUInt32BE(0)
    return hd
  }

  deriveHardened(index: number): BIP32 {
    // Only derives hardened private keys by default
    return this.derive(index + HIGHEST_BIT)
  }

  derivePath(path: string) {
    let splitPath = path.split('/')
    if (splitPath[0] === 'm') {
      if (this.parentFingerprint) {
        throw new TypeError('Expected master, got child')
      }

      splitPath = splitPath.slice(1)
    }

    return splitPath.reduce((prevHd: BIP32, indexStr) => {
      let index
      if (indexStr.slice(-1) === '\'') {
        index = parseInt(indexStr.slice(0, -1), 10)
        return prevHd.deriveHardened(index)
      }
      index = parseInt(indexStr, 10)
      return prevHd.derive(index)
    }, this)
  }

  sign(hash: Buffer) {
    return ecc.sign(hash, this.privateKey)
  }

  verify(hash: Buffer, signature: Buffer) {
    return ecc.verify(hash, this.publicKey, signature)
  }
}
