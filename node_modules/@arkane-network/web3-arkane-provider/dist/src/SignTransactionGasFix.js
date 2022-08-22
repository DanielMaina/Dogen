"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignTransactionGasFix = void 0;
var tslib_1 = require("tslib");
var subproviders_1 = require("@0x/subproviders");
var SignTransactionGasFix = /** @class */ (function (_super) {
    tslib_1.__extends(SignTransactionGasFix, _super);
    function SignTransactionGasFix() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    // tslint:disable-next-line:prefer-function-over-method async-suffix
    SignTransactionGasFix.prototype.handleRequest = function (payload, next, end) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (payload.method) {
                    case 'eth_signTransaction':
                        if (payload.params && payload.params.length > 0 && payload.params[0]) {
                            if (!payload.params[0].gas) {
                                payload.params[0].gas = "";
                            }
                            next();
                        }
                        return [2 /*return*/];
                    default:
                        next();
                        return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    };
    return SignTransactionGasFix;
}(subproviders_1.Subprovider));
exports.SignTransactionGasFix = SignTransactionGasFix;
//# sourceMappingURL=SignTransactionGasFix.js.map