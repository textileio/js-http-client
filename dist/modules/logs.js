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
 * Logs is an API module for managing the verbosity of one or all subsystems logs
 *
 * Textile logs piggyback on the IPFS event logs
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Logs extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /**
     * List the verbosity of one or all subsystems logs
     *
     * @param {string} [subsystem] Subsystem logging identifier (omit for all)
     * @param {boolean} [tex] Whether to list only Textile subsystems, or all available subsystems
     */
    get(subsystem, tex) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`api/v0/logs${subsystem ? `/${subsystem}` : ''}`, undefined, { 'tex-only': tex });
            return response.data;
        });
    }
    /**
     * Set the verbosity of one or all subsystems logs
     *
     * @param {string} subsystem Log level, must be one of: debug, info, warning, error, or critical.
     * @param {string} [subsystem] Subsystem logging identifier (omit for all)
     * @param {boolean} [tex] Whether to change only Textile subsystems, or all available subsystems
     */
    set(level, subsystem, tex) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPost(`api/v0/logs${subsystem ? `/${subsystem}` : ''}`, undefined, { level, 'tex-only': tex });
            return response.data;
        });
    }
}
exports.default = Logs;
