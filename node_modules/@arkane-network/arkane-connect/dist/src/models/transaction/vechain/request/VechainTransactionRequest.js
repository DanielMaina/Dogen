"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TransactionRequest_1 = require("../../TransactionRequest");
var VechainTransactionRequest = /** @class */ (function (_super) {
    tslib_1.__extends(VechainTransactionRequest, _super);
    function VechainTransactionRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.expiration = 0;
        _this.clauses = [];
        return _this;
    }
    return VechainTransactionRequest;
}(TransactionRequest_1.TransactionRequest));
exports.VechainTransactionRequest = VechainTransactionRequest;
//# sourceMappingURL=VechainTransactionRequest.js.map