"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BuildSignRequestBase_1 = require("./BuildSignRequestBase");
var BuildSignatureRequestType_1 = require("./BuildSignatureRequestType");
var BuildEip712SignRequest = /** @class */ (function (_super) {
    tslib_1.__extends(BuildEip712SignRequest, _super);
    function BuildEip712SignRequest(walletId, secretType, data) {
        var _this = _super.call(this, BuildSignatureRequestType_1.BuildSignatureRequestType.EIP712, walletId, secretType) || this;
        _this.data = data;
        return _this;
    }
    BuildEip712SignRequest.fromData = function (requestData) {
        var walletId = requestData.walletId, secretType = requestData.secretType, data = requestData.data;
        return new this(walletId, secretType, data);
    };
    return BuildEip712SignRequest;
}(BuildSignRequestBase_1.BuildSignRequestBase));
exports.BuildEip712SignRequest = BuildEip712SignRequest;
//# sourceMappingURL=BuildEip712SignRequest.js.map