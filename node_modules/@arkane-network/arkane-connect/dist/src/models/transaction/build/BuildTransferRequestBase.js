"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BuildTransferRequestBase = /** @class */ (function () {
    function BuildTransferRequestBase(type, walletId, to, secretType, alias, network) {
        this.type = type;
        this.walletId = walletId;
        this.to = to;
        this.secretType = secretType;
        alias ? this.alias = alias : undefined;
        network ? this.network = network : undefined;
    }
    return BuildTransferRequestBase;
}());
exports.BuildTransferRequestBase = BuildTransferRequestBase;
//# sourceMappingURL=BuildTransferRequestBase.js.map