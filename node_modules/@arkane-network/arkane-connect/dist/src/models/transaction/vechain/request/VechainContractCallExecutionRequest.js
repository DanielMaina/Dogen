"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TransactionRequest_1 = require("../../TransactionRequest");
var VechainContractCallExecutionRequest = /** @class */ (function (_super) {
    tslib_1.__extends(VechainContractCallExecutionRequest, _super);
    function VechainContractCallExecutionRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.expiration = 0;
        _this.contractCalls = [];
        return _this;
    }
    return VechainContractCallExecutionRequest;
}(TransactionRequest_1.TransactionRequest));
exports.VechainContractCallExecutionRequest = VechainContractCallExecutionRequest;
//# sourceMappingURL=VechainContractCallExecutionRequest.js.map