"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BuildTransactionRequestType_1 = require("./BuildTransactionRequestType");
var BuildTransferRequestBase_1 = require("./BuildTransferRequestBase");
var BuildTokenTransferRequest = /** @class */ (function (_super) {
    tslib_1.__extends(BuildTokenTransferRequest, _super);
    function BuildTokenTransferRequest(walletId, to, value, secretType, tokenAddress, alias, network) {
        var _this = _super.call(this, BuildTransactionRequestType_1.BuildTransactionRequestType.TOKEN_TRANSFER, walletId, to, secretType, alias, network) || this;
        _this.value = value;
        _this.tokenAddress = tokenAddress;
        return _this;
    }
    BuildTokenTransferRequest.fromData = function (requestData) {
        var walletId = requestData.walletId, to = requestData.to, alias = requestData.alias, value = requestData.value, secretType = requestData.secretType, tokenAddress = requestData.tokenAddress, network = requestData.network;
        return new this(walletId, to, value, secretType, tokenAddress, alias, network);
    };
    return BuildTokenTransferRequest;
}(BuildTransferRequestBase_1.BuildTransferRequestBase));
exports.BuildTokenTransferRequest = BuildTokenTransferRequest;
//# sourceMappingURL=BuildTokenTransferRequest.js.map