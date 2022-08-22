"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContractCallInput = /** @class */ (function () {
    function ContractCallInput(type, value) {
        this.type = type;
        this.value = value;
    }
    ContractCallInput.fromData = function (data) {
        var type = data.type, value = data.value;
        return new this(type, value);
    };
    return ContractCallInput;
}());
exports.ContractCallInput = ContractCallInput;
//# sourceMappingURL=ContractCallInput.js.map