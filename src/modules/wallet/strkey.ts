import crc from 'crc'
import base58 from 'bs58'
import { verifyChecksum } from '../../helpers/checksum'

const versionBytes: {[key: string]: number} = {
  // Version byte used for encoded textile address
  ed25519PublicKey: 0xdd, // Base58-encodes to 'P...'
  // Version byte used for encoded textile seed
  ed25519SecretSeed: 0xff // Base58-encodes to 'S...'
}

function calculateChecksum(payload: string | Buffer) {
  // This code calculates CRC16-XModem checksum of payload and returns it in little-endian order.
  const checksum = Buffer.alloc(2)
  checksum.writeUInt16LE(crc.crc16xmodem(payload), 0)
  return checksum
}

function encodeCheck(versionByteName: 'ed25519PublicKey' | 'ed25519SecretSeed', input: Buffer) {
  const versionByte = versionBytes[versionByteName]
  const data = Buffer.from(input)
  const versionBuffer = Buffer.from([versionByte])
  const payload = Buffer.concat([versionBuffer, data])
  const checksum = calculateChecksum(payload)
  const unencoded = Buffer.concat([payload, checksum])

  return base58.encode(unencoded)
}

function decodeCheck(versionByteName: 'ed25519PublicKey' | 'ed25519SecretSeed', encoded: string) {
  const decoded = base58.decode(encoded)
  const versionByte = decoded[0]
  const payload = decoded.slice(0, -2)
  const data = payload.slice(1)
  const checksum = decoded.slice(-2)

  if (encoded !== base58.encode(decoded)) {
    throw new Error('invalid encoded string')
  }

  const expectedVersion = versionBytes[versionByteName]

  if (expectedVersion === undefined) {
    throw new Error(
      `${versionByteName} is not a valid version byte name.`
    )
  }

  if (versionByte !== expectedVersion) {
    throw new Error(
      `invalid version byte. expected ${expectedVersion}, got ${versionByte}`
    )
  }

  const expectedChecksum = calculateChecksum(payload)

  if (!verifyChecksum(expectedChecksum, checksum)) {
    throw new Error(`invalid checksum`)
  }

  return Buffer.from(data)
}

function isValid(versionByteName: 'ed25519PublicKey' | 'ed25519SecretSeed', encoded: string) {
  if (encoded.length !== 56) {
    return false
  }

  try {
    const decoded = decodeCheck(versionByteName, encoded)
    if (decoded.length !== 32) {
      return false
    }
  } catch (err) {
    return false
  }
  return true
}

/**
 * StrKey is a helper class that allows encoding and decoding strkey.
 *
 * Copyright (c) 2015-2018 Stellar Development Foundation
 */
export class StrKey {
  /**
   * Encodes data to strkey ed25519 public key.
   * @param data data to encode
   * @returns ed25519 public key
   */
  static encodeEd25519PublicKey(data: Buffer) {
    return encodeCheck('ed25519PublicKey', data)
  }

  /**
   * Decodes strkey ed25519 public key to raw data.
   * @param data data to decode
   * @returns Raw bytes
   */
  static decodeEd25519PublicKey(data: string) {
    return decodeCheck('ed25519PublicKey', data)
  }

  /**
   * Returns true if the given public key is a valid ed25519 public key.
   * @param publicKey public key to check
   * @returns Whether the public key is valid
   */
  static isValidEd25519PublicKey(publicKey: string) {
    return isValid('ed25519PublicKey', publicKey)
  }

  /**
   * Encodes data to strkey ed25519 seed.
   * @param data data to encode
   * @returns ed25519 seed
   */
  static encodeEd25519SecretSeed(data: Buffer) {
    return encodeCheck('ed25519SecretSeed', data)
  }

  /**
   * Decodes strkey ed25519 seed to raw data.
   * @param data data to decode
   * @returns Raw bytes
   */
  static decodeEd25519SecretSeed(data: string) {
    return decodeCheck('ed25519SecretSeed', data)
  }

  /**
   * Returns true if the given secret key is a valid ed25519 secret seed.
   * @param seed seed to check
   * @returns Whether the secret key is valid
   */
  static isValidEd25519SecretSeed(seed: string) {
    return isValid('ed25519SecretSeed', seed)
  }
}
