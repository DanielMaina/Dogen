"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BuildTransferRequestBase_1 = require("./BuildTransferRequestBase");
var BuildTransactionRequestType_1 = require("./BuildTransactionRequestType");
var ContractCallInput_1 = require("./ContractCallInput");
var BuildContractExecutionRequest = /** @class */ (function (_super) {
    tslib_1.__extends(BuildContractExecutionRequest, _super);
    function BuildContractExecutionRequest(walletId, to, secretType, functionName, inputs, value, chainSpecificFields, alias, network) {
        var _this = _super.call(this, BuildTransactionRequestType_1.BuildTransactionRequestType.CONTRACT_EXECUTION, walletId, to, secretType, alias, network) || this;
        _this.functionName = functionName;
        _this.value = value;
        _this.inputs = inputs;
        _this.chainSpecificFields = chainSpecificFields;
        return _this;
    }
    BuildContractExecutionRequest.fromData = function (data) {
        var walletId = data.walletId, to = data.to, secretType = data.secretType, alias = data.alias, network = data.network, functionName = data.functionName, value = data.value, chainSpecificFields = data.chainSpecificFields;
        var inputs = data.inputs ? data.inputs.map(function (inputDto) { return ContractCallInput_1.ContractCallInput.fromData(inputDto); }) : [];
        return new this(walletId, to, secretType, functionName, inputs, value, chainSpecificFields, alias, network);
    };
    return BuildContractExecutionRequest;
}(BuildTransferRequestBase_1.BuildTransferRequestBase));
exports.BuildContractExecutionRequest = BuildContractExecutionRequest;
//# sourceMappingURL=BuildContractExecutionRequest.js.map