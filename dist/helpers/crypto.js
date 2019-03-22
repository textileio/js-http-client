"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_hash_1 = __importDefault(require("create-hash"));
const create_hmac_1 = __importDefault(require("create-hmac"));
function hash160(buffer) {
    return create_hash_1.default('rmd160')
        .update(create_hash_1.default('sha256')
        .update(buffer)
        .digest())
        .digest();
}
exports.hash160 = hash160;
function hmacSHA512(key, data) {
    return create_hmac_1.default('sha512', key)
        .update(data)
        .digest();
}
exports.hmacSHA512 = hmacSHA512;
