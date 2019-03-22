"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../core/api");
/**
 * Profile is an API module for accessing public profile information
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Profile extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /**
     * Retrieve the local node's public profile
     * @returns {Promise<any>}
     */
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('/api/v0/profile');
            return response.data;
        });
    }
    /**
     * Get the local node's public profile username
     * @returns {Promise<string>} username
     */
    username() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.get();
            return data.username;
        });
    }
    /**
     * Set the local node's public profile username
     *
     * @param {string} username Username string
     */
    setUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendPost('/api/v0/profile/username', [username]);
        });
    }
    /**
     * Get the local node's public profile avatar image hash
     * @returns {Promise<string>} hash
     */
    avatar() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.get();
            return data.avatar;
        });
    }
    /**
     * Set the local node's public profile avatar by specifying an existing image file hash
     *
     * @param {string} hash Image file hash
     */
    setAvatar(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendPost('/api/v0/profile/avatar', [hash]);
        });
    }
}
exports.default = Profile;
