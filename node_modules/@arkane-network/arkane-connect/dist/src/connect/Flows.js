"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Utils_1 = tslib_1.__importDefault(require("../utils/Utils"));
var GeneralPopup_1 = require("../popup/GeneralPopup");
var PopupActions_1 = require("../popup/PopupActions");
var Security_1 = require("./Security");
var WindowMode_1 = require("../models/WindowMode");
var Flows = /** @class */ (function () {
    function Flows(arkaneConnect, clientId) {
        this.clientId = clientId;
        this.arkaneConnect = arkaneConnect;
    }
    Flows.prototype.authenticate = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var authOptions, loginResult;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authOptions = tslib_1.__assign({}, options);
                        authOptions.windowMode = authOptions.windowMode || this.arkaneConnect.windowMode;
                        return [4 /*yield*/, Security_1.Security.login(this.clientId, authOptions)];
                    case 1:
                        loginResult = _a.sent();
                        return [2 /*return*/, this.arkaneConnect._afterAuthenticationForFlowUse(loginResult)];
                }
            });
        });
    };
    Flows.prototype.manageWallets = function (chain, options) {
        var windowMode = options && options.windowMode || this.arkaneConnect.windowMode;
        var useOverlayWithPopup = options && options.useOverlayWithPopup != undefined ? options.useOverlayWithPopup : this.arkaneConnect.useOverlayWithPopup;
        if (windowMode === WindowMode_1.WindowMode.REDIRECT) {
            return this.manageWalletsRedirect(chain, options);
        }
        else {
            return this.manageWalletsPopup(chain, { useOverlay: useOverlayWithPopup });
        }
    };
    Flows.prototype.linkWallets = function (options) {
        var windowMode = options && options.windowMode || this.arkaneConnect.windowMode;
        var useOverlayWithPopup = options && options.useOverlayWithPopup != undefined ? options.useOverlayWithPopup : this.arkaneConnect.useOverlayWithPopup;
        if (windowMode === WindowMode_1.WindowMode.REDIRECT) {
            return this.linkWalletsRedirect(options);
        }
        else {
            return this.linkWalletsPopup({ useOverlay: useOverlayWithPopup });
        }
    };
    Flows.prototype.claimWallets = function (options) {
        var windowMode = options && options.windowMode || this.arkaneConnect.windowMode;
        var useOverlayWithPopup = options && options.useOverlayWithPopup || this.arkaneConnect.useOverlayWithPopup;
        if (windowMode === WindowMode_1.WindowMode.REDIRECT) {
            return this.claimWalletsRedirect(options);
        }
        else {
            return this.claimWalletsPopup({ useOverlay: useOverlayWithPopup });
        }
    };
    Flows.prototype.getAccount = function (chain, authenticationOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loginResult, wallets, start, options, result, popupResult, e_1, timeout;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loginResult = {};
                        wallets = [];
                        start = +Date.now();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        options = { windowMode: WindowMode_1.WindowMode.POPUP, closePopup: false };
                        if (authenticationOptions && authenticationOptions.idpHint) {
                            options.idpHint = authenticationOptions.idpHint;
                        }
                        return [4 /*yield*/, Security_1.Security.login(this.clientId, options)];
                    case 2:
                        loginResult = _a.sent();
                        result = this.arkaneConnect._afterAuthenticationForFlowUse(loginResult);
                        if (!result.isAuthenticated) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.arkaneConnect.api.getWallets({ secretType: chain.toUpperCase() })];
                    case 3:
                        wallets = _a.sent();
                        if (!!(wallets && wallets.length > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.manageWallets(chain, { windowMode: WindowMode_1.WindowMode.POPUP })];
                    case 4:
                        popupResult = _a.sent();
                        if (!(popupResult && popupResult.status === 'SUCCESS')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.arkaneConnect.api.getWallets({ secretType: chain.toUpperCase() })];
                    case 5:
                        wallets = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!result.isAuthenticated || wallets.length === 0) {
                            throw Error('Something went wrong.');
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 8];
                    case 8:
                        if (loginResult && loginResult.popupWindow) {
                            timeout = 1500 - (+Date.now() - start);
                            if (timeout <= 0) {
                                loginResult.popupWindow.close();
                            }
                            else {
                                setTimeout(function () {
                                    loginResult.popupWindow.close();
                                }, timeout);
                            }
                        }
                        return [2 /*return*/, {
                                wallets: wallets,
                                auth: loginResult.keycloak,
                                isAuthenticated: loginResult.authenticated
                            }];
                }
            });
        });
    };
    Flows.prototype.manageWalletsRedirect = function (chain, options) {
        Utils_1.default.http().postInForm(Utils_1.default.urls.connect + "/wallets/manage", { chain: chain.toLowerCase() }, this.arkaneConnect._bearerTokenProvider, options);
        return Promise.resolve();
    };
    Flows.prototype.manageWalletsPopup = function (chain, options) {
        return GeneralPopup_1.GeneralPopup.openNewPopup(PopupActions_1.PopupActions.MANAGE_WALLETS, this.arkaneConnect._bearerTokenProvider, { chain: chain.toLowerCase() }, options);
    };
    Flows.prototype.linkWalletsRedirect = function (options) {
        Utils_1.default.http().postInForm(Utils_1.default.urls.connect + "/wallets/link", {}, this.arkaneConnect._bearerTokenProvider, options);
        return Promise.resolve();
    };
    Flows.prototype.linkWalletsPopup = function (options) {
        return GeneralPopup_1.GeneralPopup.openNewPopup(PopupActions_1.PopupActions.LINK_WALLET, this.arkaneConnect._bearerTokenProvider, undefined, options);
    };
    Flows.prototype.claimWalletsRedirect = function (options) {
        Utils_1.default.http().postInForm(Utils_1.default.urls.connect + "/wallets/claim", {}, this.arkaneConnect._bearerTokenProvider, options);
        return Promise.resolve();
    };
    Flows.prototype.claimWalletsPopup = function (options) {
        return GeneralPopup_1.GeneralPopup.openNewPopup(PopupActions_1.PopupActions.CLAIM_WALLETS, this.arkaneConnect._bearerTokenProvider, undefined, options);
    };
    return Flows;
}());
exports.Flows = Flows;
//# sourceMappingURL=Flows.js.map