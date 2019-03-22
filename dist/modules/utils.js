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
 * Utils is an API module for various Textile node utilities
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Utils extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /** Get the current node's API, and application versions */
    version() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('/');
            return response.data;
        });
    }
    /** Get a summary of all local node data */
    nodeSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('api/v0/summary');
            return response.data;
        });
    }
    /** Get a summary of all local node data */
    online() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet('/health');
            return response.status === 204;
        });
    }
}
exports.default = Utils;
