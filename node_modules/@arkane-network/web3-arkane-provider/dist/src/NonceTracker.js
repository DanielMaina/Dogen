"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonceTrackerSubprovider = void 0;
var tslib_1 = require("tslib");
var inherits = require('util').inherits;
var Transaction = require('ethereumjs-tx');
var ethUtil = require('ethereumjs-util');
var Subprovider = require('@arkane-network/web3-provider-engine/subproviders/subprovider');
var blockTagForPayload = require('@arkane-network/web3-provider-engine/util/rpc-cache-utils').blockTagForPayload;
var NonceTrackerSubprovider = /** @class */ (function (_super) {
    tslib_1.__extends(NonceTrackerSubprovider, _super);
    function NonceTrackerSubprovider(opts) {
        var _this = _super.call(this) || this;
        var self = _this;
        self.nonceCache = {};
        self.rpcUrl = opts.rpcUrl;
        return _this;
    }
    NonceTrackerSubprovider.prototype.handleRequest = function (payload, next, end) {
        var self = this;
        switch (payload.method) {
            case 'eth_getTransactionCount':
                var blockTag = blockTagForPayload(payload);
                var address = payload.params[0].toLowerCase();
                var cachedResult = self.nonceCache[self.rpcUrl] && self.nonceCache[self.rpcUrl][address];
                // only handle requests against the 'pending' blockTag
                if (blockTag === 'pending') {
                    // has a result
                    if (cachedResult) {
                        end(null, cachedResult);
                        // fallthrough then populate cache
                    }
                    else {
                        next(function (err, result, cb) {
                            if (err)
                                return cb();
                            if (self.nonceCache[self.rpcUrl] === undefined) {
                                self.nonceCache[self.rpcUrl] = {};
                            }
                            if (self.nonceCache[self.rpcUrl][address] === undefined) {
                                self.nonceCache[self.rpcUrl][address] = result;
                            }
                            cb();
                        });
                    }
                }
                else {
                    next();
                }
                return;
            case 'eth_sendRawTransaction':
                // allow the request to continue normally
                next(function (err, result, cb) {
                    // only update local nonce if tx was submitted correctly
                    if (err)
                        return cb();
                    // parse raw tx
                    var rawTx = payload.params[0];
                    var stripped = ethUtil.stripHexPrefix(rawTx);
                    var rawData = new Buffer(ethUtil.stripHexPrefix(rawTx), 'hex');
                    var tx = new Transaction(new Buffer(ethUtil.stripHexPrefix(rawTx), 'hex'));
                    // extract address
                    var address = '0x' + tx.getSenderAddress().toString('hex').toLowerCase();
                    // extract nonce and increment
                    var nonce = ethUtil.bufferToInt(tx.nonce);
                    nonce++;
                    // hexify and normalize
                    var hexNonce = nonce.toString(16);
                    if (hexNonce.length % 2)
                        hexNonce = '0' + hexNonce;
                    hexNonce = '0x' + hexNonce;
                    // dont update our record on the nonce until the submit was successful
                    // update cache
                    if (self.nonceCache[self.rpcUrl] === undefined) {
                        self.nonceCache[self.rpcUrl] = {};
                    }
                    self.nonceCache[self.rpcUrl][address] = hexNonce;
                    cb();
                });
                return;
            default:
                next();
                return;
        }
    };
    return NonceTrackerSubprovider;
}(Subprovider));
exports.NonceTrackerSubprovider = NonceTrackerSubprovider;
//# sourceMappingURL=NonceTracker.js.map