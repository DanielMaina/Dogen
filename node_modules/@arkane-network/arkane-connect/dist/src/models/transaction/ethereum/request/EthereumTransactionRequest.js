"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TransactionRequest_1 = require("../../TransactionRequest");
var EthereumTransactionRequest = /** @class */ (function (_super) {
    tslib_1.__extends(EthereumTransactionRequest, _super);
    function EthereumTransactionRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = '0x';
        return _this;
    }
    return EthereumTransactionRequest;
}(TransactionRequest_1.TransactionRequest));
exports.EthereumTransactionRequest = EthereumTransactionRequest;
//# sourceMappingURL=EthereumTransactionRequest.js.map