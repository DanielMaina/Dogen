"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BuildTransactionRequestType_1 = require("./BuildTransactionRequestType");
var BuildTransferRequestBase_1 = require("./BuildTransferRequestBase");
var BuildSimpleTransactionRequest = /** @class */ (function (_super) {
    tslib_1.__extends(BuildSimpleTransactionRequest, _super);
    function BuildSimpleTransactionRequest(walletId, to, secretType, value, alias, data, network) {
        var _this = _super.call(this, BuildTransactionRequestType_1.BuildTransactionRequestType.TRANSFER, walletId, to, secretType, alias, network) || this;
        _this.value = value;
        data ? _this.data = data : undefined;
        return _this;
    }
    BuildSimpleTransactionRequest.fromData = function (requestData) {
        var walletId = requestData.walletId, to = requestData.to, secretType = requestData.secretType, value = requestData.value, alias = requestData.alias, data = requestData.data, network = requestData.network;
        return new this(walletId, to, secretType, value, alias, data, network);
    };
    return BuildSimpleTransactionRequest;
}(BuildTransferRequestBase_1.BuildTransferRequestBase));
exports.BuildSimpleTransactionRequest = BuildSimpleTransactionRequest;
//# sourceMappingURL=BuildSimpleTransactionRequest.js.map