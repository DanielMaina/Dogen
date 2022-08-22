"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BuildSignRequestBase_1 = require("./BuildSignRequestBase");
var BuildSignatureRequestType_1 = require("./BuildSignatureRequestType");
var BuildMessageSignRequest = /** @class */ (function (_super) {
    tslib_1.__extends(BuildMessageSignRequest, _super);
    function BuildMessageSignRequest(walletId, secretType, data) {
        var _this = _super.call(this, BuildSignatureRequestType_1.BuildSignatureRequestType.MESSAGE, walletId, secretType) || this;
        _this.data = data;
        return _this;
    }
    BuildMessageSignRequest.fromData = function (requestData) {
        var walletId = requestData.walletId, secretType = requestData.secretType, data = requestData.data;
        return new this(walletId, secretType, data);
    };
    return BuildMessageSignRequest;
}(BuildSignRequestBase_1.BuildSignRequestBase));
exports.BuildMessageSignRequest = BuildMessageSignRequest;
//# sourceMappingURL=BuildMessageSignRequest.js.map