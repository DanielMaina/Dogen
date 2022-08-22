"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BuildTransactionRequestType_1 = require("./BuildTransactionRequestType");
var BuildTransferRequestBase_1 = require("./BuildTransferRequestBase");
var BuildNftTransferRequest = /** @class */ (function (_super) {
    tslib_1.__extends(BuildNftTransferRequest, _super);
    function BuildNftTransferRequest(walletId, to, secretType, tokenAddress, tokenId, amount, from, alias, network) {
        var _this = _super.call(this, BuildTransactionRequestType_1.BuildTransactionRequestType.NFT_TRANSFER, walletId, to, secretType, alias, network) || this;
        _this.tokenAddress = tokenAddress;
        _this.tokenId = tokenId;
        _this.amount = amount ? amount : 1;
        from ? _this.from = from : undefined;
        return _this;
    }
    BuildNftTransferRequest.fromData = function (requestData) {
        var walletId = requestData.walletId, to = requestData.to, secretType = requestData.secretType, tokenAddress = requestData.tokenAddress, tokenId = requestData.tokenId, amount = requestData.amount, from = requestData.from, alias = requestData.alias, network = requestData.network;
        return new this(walletId, to, secretType, tokenAddress, tokenId, amount, from, alias, network);
    };
    return BuildNftTransferRequest;
}(BuildTransferRequestBase_1.BuildTransferRequestBase));
exports.BuildNftTransferRequest = BuildNftTransferRequest;
//# sourceMappingURL=BuildNftTransferRequest.js.map