"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BuildTransactionRequestType_1 = require("./BuildTransactionRequestType");
var BuildTransferRequestBase_1 = require("./BuildTransferRequestBase");
var BuildTransactionRequest = /** @class */ (function (_super) {
    tslib_1.__extends(BuildTransactionRequest, _super);
    function BuildTransactionRequest(walletId, to, secretType, value, alias, tokenAddress, data, from, tokenId, network) {
        var _this = this;
        var type;
        if (tokenAddress && tokenId) {
            type = BuildTransactionRequestType_1.BuildTransactionRequestType.NFT_TRANSFER;
        }
        else if (tokenAddress) {
            type = BuildTransactionRequestType_1.BuildTransactionRequestType.TOKEN_TRANSFER;
        }
        else {
            type = BuildTransactionRequestType_1.BuildTransactionRequestType.TRANSFER;
        }
        _this = _super.call(this, type, walletId, to, secretType, alias, network) || this;
        _this.value = value;
        tokenAddress ? _this.tokenAddress = tokenAddress : undefined;
        data ? _this.data = data : undefined;
        from ? _this.from = from : undefined;
        tokenId ? _this.tokenId = tokenId : undefined;
        return _this;
    }
    BuildTransactionRequest.fromData = function (requestData) {
        var walletId = requestData.walletId, to = requestData.to, secretType = requestData.secretType, value = requestData.value, alias = requestData.alias, tokenAddress = requestData.tokenAddress, data = requestData.data, from = requestData.from, tokenId = requestData.tokenId, network = requestData.network;
        return new this(walletId, to, secretType, value, alias, tokenAddress, data, from, tokenId, network);
    };
    return BuildTransactionRequest;
}(BuildTransferRequestBase_1.BuildTransferRequestBase));
exports.BuildTransactionRequest = BuildTransactionRequest;
//# sourceMappingURL=BuildTransactionRequest.js.map