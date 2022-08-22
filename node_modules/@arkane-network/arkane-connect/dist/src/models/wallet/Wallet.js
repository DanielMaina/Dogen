"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WalletType;
(function (WalletType) {
    WalletType["THREEWAY_SHARED"] = "THREEWAY_SHARED";
    WalletType["USER_OWNED"] = "USER_OWNED";
    WalletType["UNCLAIMED"] = "UNCLAIMED";
    WalletType["APPLICATION"] = "APPLICATION";
})(WalletType = exports.WalletType || (exports.WalletType = {}));
var WalletAppType;
(function (WalletAppType) {
    WalletAppType["APP"] = "APP";
    WalletAppType["PERSONAL"] = "PERSONAL";
})(WalletAppType = exports.WalletAppType || (exports.WalletAppType = {}));
var Wallet = /** @class */ (function () {
    function Wallet() {
        this.alias = '';
        this.description = '';
        this.lastUpdated = 0;
    }
    return Wallet;
}());
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map