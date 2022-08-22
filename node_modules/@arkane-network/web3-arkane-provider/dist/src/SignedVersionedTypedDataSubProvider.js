"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignedVersionedTypedDataSubProvider = void 0;
var tslib_1 = require("tslib");
var subproviders_1 = require("@0x/subproviders");
var SignedVersionedTypedDataSubProvider = /** @class */ (function (_super) {
    tslib_1.__extends(SignedVersionedTypedDataSubProvider, _super);
    function SignedVersionedTypedDataSubProvider(arkaneWalletSubProvider) {
        var _this = _super.call(this) || this;
        _this.arkaneWalletSubProvider = arkaneWalletSubProvider;
        return _this;
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
    SignedVersionedTypedDataSubProvider.prototype.handleRequest = function (payload, next, end) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, result;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = payload.method;
                        switch (_a) {
                            case 'eth_signTypedData_v4': return [3 /*break*/, 1];
                            case 'eth_signTypedData_v3': return [3 /*break*/, 1];
                            case 'eth_signTypedData_v2': return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(!payload.params[0] || !payload.params[1])) return [3 /*break*/, 2];
                        end(new Error('Missing parameters for signing data, 2 params needed: address, eip712Data'));
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.arkaneWalletSubProvider.signTypedDataAsync(payload.params[0], payload.params[1])];
                    case 3:
                        result = _b.sent();
                        end(null, result);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                    case 5:
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SignedVersionedTypedDataSubProvider;
}(subproviders_1.Subprovider));
exports.SignedVersionedTypedDataSubProvider = SignedVersionedTypedDataSubProvider;
//# sourceMappingURL=SignedVersionedTypedDataSubProvider.js.map