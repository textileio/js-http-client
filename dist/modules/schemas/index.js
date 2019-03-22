"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_js_1 = require("../../core/api.js");
const defaults_1 = __importDefault(require("./defaults"));
/**
 * Schemas is an API module for managing Textile schemas
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Schemas extends api_js_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /* eslint-disable class-methods-use-this */
    /** Default Textile schemas */
    defaults() {
        return __awaiter(this, void 0, void 0, function* () {
            return defaults_1.default;
        });
    }
    /* eslint-enable class-methods-use-this */
    /**
     * Creates and validates a new schema from input JSON
     *
     * @param {object} schema Input JSON-based thread schema
     */
    // TODO: Verify type
    add(schema) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPost(`/api/v0/mills/schema`, undefined, undefined, schema, { 'Content-Type': 'application/json' });
            return response.data;
        });
    }
    /**
     * Retrieves a schema by thread ID
     *
     * @param {string} threadId ID of the thread
     */
    get(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/threads/${threadId}`);
            return response.data.schema_node;
        });
    }
}
exports.default = Schemas;
