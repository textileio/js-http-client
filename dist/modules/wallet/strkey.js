"use strict";
/* eslint-disable no-bitwise */
const crc = require("crc");
const base58 = require("bs58");
const { verifyChecksum } = require("../../helpers/checksum");
const versionBytes = {
    // Version byte used for encoded textile address
    ed25519PublicKey: 0xdd,
    // Version byte used for encoded textile seed
    ed25519SecretSeed: 0xff // Base58-encodes to 'S...'
};
function calculateChecksum(payload) {
    // This code calculates CRC16-XModem checksum of payload
    // and returns it as Buffer in little-endian order.
    const checksum = Buffer.alloc(2);
    checksum.writeUInt16LE(crc.crc16xmodem(payload), 0);
    return checksum;
}
function encodeCheck(versionByteName, input) {
    if (input === null || input === undefined) {
        throw new Error("cannot encode null data");
    }
    const versionByte = versionBytes[versionByteName];
    if (versionByte === undefined) {
        throw new Error(`${versionByteName} is not a valid version byte name.  expected one of "ed25519PublicKey", "ed25519SecretSeed"`);
    }
    const data = Buffer.from(input);
    const versionBuffer = Buffer.from([versionByte]);
    const payload = Buffer.concat([versionBuffer, data]);
    const checksum = calculateChecksum(payload);
    const unencoded = Buffer.concat([payload, checksum]);
    return base58.encode(unencoded);
}
function decodeCheck(versionByteName, encoded) {
    if (typeof encoded !== "string") {
        throw new TypeError("encoded argument must be of type String");
    }
    const decoded = base58.decode(encoded);
    const versionByte = decoded[0];
    const payload = decoded.slice(0, -2);
    const data = payload.slice(1);
    const checksum = decoded.slice(-2);
    if (encoded !== base58.encode(decoded)) {
        throw new Error("invalid encoded string");
    }
    const expectedVersion = versionBytes[versionByteName];
    if (expectedVersion === undefined) {
        throw new Error(`${versionByteName} is not a valid version byte name.  expected one of "accountId" or "seed"`);
    }
    if (versionByte !== expectedVersion) {
        throw new Error(`invalid version byte. expected ${expectedVersion}, got ${versionByte}`);
    }
    const expectedChecksum = calculateChecksum(payload);
    if (!verifyChecksum(expectedChecksum, checksum)) {
        throw new Error(`invalid checksum`);
    }
    return Buffer.from(data);
}
function isValid(versionByteName, encoded) {
    if (encoded && encoded.length !== 56) {
        return false;
    }
    try {
        const decoded = decodeCheck(versionByteName, encoded);
        if (decoded.length !== 32) {
            return false;
        }
    }
    catch (err) {
        return false;
    }
    return true;
}
/**
 * StrKey is a helper class that allows encoding and decoding strkey.
 *
 * Copyright (c) 2015-2018 Stellar Development Foundation
 */
class StrKey {
    /**
     * Encodes data to strkey ed25519 public key.
     * @param {Buffer} data data to encode
     * @returns {string}
     */
    static encodeEd25519PublicKey(data) {
        return encodeCheck("ed25519PublicKey", data);
    }
    /**
     * Decodes strkey ed25519 public key to raw data.
     * @param {string} data data to decode
     * @returns {Buffer}
     */
    static decodeEd25519PublicKey(data) {
        return decodeCheck("ed25519PublicKey", data);
    }
    /**
     * Returns true if the given Stellar public key is a valid ed25519 public key.
     * @param {string} publicKey public key to check
     * @returns {boolean}
     */
    static isValidEd25519PublicKey(publicKey) {
        return isValid("ed25519PublicKey", publicKey);
    }
    /**
     * Encodes data to strkey ed25519 seed.
     * @param {Buffer} data data to encode
     * @returns {string}
     */
    static encodeEd25519SecretSeed(data) {
        return encodeCheck("ed25519SecretSeed", data);
    }
    /**
     * Decodes strkey ed25519 seed to raw data.
     * @param {string} data data to decode
     * @returns {Buffer}
     */
    static decodeEd25519SecretSeed(data) {
        return decodeCheck("ed25519SecretSeed", data);
    }
    /**
     * Returns true if the given Stellar secret key is a valid ed25519 secret seed.
     * @param {string} seed seed to check
     * @returns {boolean}
     */
    static isValidEd25519SecretSeed(seed) {
        return isValid("ed25519SecretSeed", seed);
    }
}
module.exports = { StrKey };
