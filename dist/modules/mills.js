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
 * Mills is an API module for processing Textile mills
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class Mills extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /**
     * Run a mill over a given payload
     *
     * Currently supports:
     * * `/blob` - Process raw data blobs
     * * `/image/exif` - Extract EXIF data from an image
     * * `/image/resize` - Resize an image
     * * `/json` - Process (and validate according to schema.org definition) input JSON data
     * * `/schema` - Validate, add, and pin a new JSON-based Schema
     *
     * @param {string} name Name of the mill. (Relative uri). See above description
     * for details
     * @param {object} options Schema options for the mill
     * @param {object} payload A multi-part form containing the payload
     * @param {object} [headers] Extra headers to send in the request
     */
    run(name, options, payload, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sendPostMultiPart(`api/v0/mills${name}`, [], options, payload, headers);
        });
    }
}
exports.default = Mills;
