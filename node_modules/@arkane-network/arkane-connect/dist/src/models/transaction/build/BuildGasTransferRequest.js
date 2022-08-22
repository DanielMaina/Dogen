"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BuildTransactionRequestType_1 = require("./BuildTransactionRequestType");
var BuildTransferRequestBase_1 = require("./BuildTransferRequestBase");
var BuildGasTransferRequest = /** @class */ (function (_super) {
    tslib_1.__extends(BuildGasTransferRequest, _super);
    function BuildGasTransferRequest(walletId, to, value, secretType, alias, network) {
        var _this = _super.call(this, BuildTransactionRequestType_1.BuildTransactionRequestType.GAS_TRANSFER, walletId, to, secretType, alias, network) || this;
        _this.value = value;
        return _this;
    }
    BuildGasTransferRequest.fromData = function (data) {
        var walletId = data.walletId, to = data.to, value = data.value, secretType = data.secretType, alias = data.alias, network = data.network;
        return new this(walletId, to, value, secretType, alias, network);
    };
    return BuildGasTransferRequest;
}(BuildTransferRequestBase_1.BuildTransferRequestBase));
exports.BuildGasTransferRequest = BuildGasTransferRequest;
//# sourceMappingURL=BuildGasTransferRequest.js.map