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
 * IPFS is an API module for working with an underlying IPFS peer
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
class IPFS extends api_1.API {
    constructor(opts) {
        super(opts);
        this.opts = opts;
    }
    /** Retrieves underlying IPFS peer ID */
    peerId() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/ipfs/id`);
            return response.data;
        });
    }
    /**
     * Lists the set of peers to which this node is connected
     *
     * @param {object} [options] Options for listing swarm peers
     * @param {boolean} [options.verbose=false] Display all extra information
     * @param {boolean} [options.latency=false] Also list information about latency to each peer
     * @param {boolean} [options.streams=false] Also list information about open streams for each peer
     * @param {boolean} [options.direction=false] Also list information about the direction of connection
     */
    swarmPeers(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.sendGet('api/v0/ipfs/swarm/peers', undefined, options);
            return data;
        });
    }
    /**
     * Retrieves the data behind an IPFS CID (hash)
     *
     * @param {string} cid IPFS/IPNS content ID
     * @param {string} [key] Key to decrypt the underlying data on-the-fly
     */
    cat(cid, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/ipfs/cat/${cid}`, undefined, {
                key
            });
            return response.data;
        });
    }
    /**
     * Opens a new direct connection to a peer using an IPFS multiaddr
     *
     * @param {string} addr Peer IPFS multiaddr
     */
    swarmConnect(addr) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGet(`/api/v0/ipfs/swarm/connect`, [addr]);
            return response.data;
        });
    }
}
exports.default = IPFS;
