"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Security_1 = require("./Security");
var Api_1 = require("../api/Api");
var WindowMode_1 = require("../models/WindowMode");
var Signer_1 = require("../signer/Signer");
var Utils_1 = tslib_1.__importDefault(require("../utils/Utils"));
var Flows_1 = require("./Flows");
var ArkaneConnect = /** @class */ (function () {
    function ArkaneConnect(clientId, options) {
        var _this = this;
        this.clientId = clientId;
        this.signUsing = (options && options.signUsing) || WindowMode_1.WindowMode.POPUP;
        this.windowMode = (options && options.windowMode) || WindowMode_1.WindowMode.POPUP;
        this.useOverlayWithPopup = (options && options.useOverlayWithPopup != undefined) ? options.useOverlayWithPopup : true;
        Utils_1.default.rawEnvironment = options && options.environment || 'prod';
        this._bearerTokenProvider = options && options.bearerTokenProvider || (function () { return _this.loginResult && _this.loginResult.authenticated && _this.auth && _this.auth.token || ''; });
        if (this._bearerTokenProvider) {
            this.api = new Api_1.Api(Utils_1.default.urls.api, this._bearerTokenProvider);
        }
        this.flows = new Flows_1.Flows(this, this.clientId);
    }
    ArkaneConnect.prototype.checkAuthenticated = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loginResult;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.loginResult) return [3 /*break*/, 1];
                        return [2 /*return*/, this.afterAuthentication(this.loginResult)];
                    case 1: return [4 /*yield*/, Security_1.Security.checkAuthenticated(this.clientId)];
                    case 2:
                        loginResult = _a.sent();
                        return [2 /*return*/, this.afterAuthentication(loginResult)];
                }
            });
        });
    };
    ArkaneConnect.prototype.logout = function (options) {
        var _this = this;
        this.loginResult = undefined;
        var windowMode = options && options.windowMode || this.windowMode;
        if (windowMode === WindowMode_1.WindowMode.REDIRECT) {
            return new Promise(function (resolve, reject) {
                var logoutOptions = {};
                if (options && options.redirectUri) {
                    Object.assign(logoutOptions, { redirectUri: options.redirectUri });
                }
                _this.auth ? _this.auth.logout(logoutOptions).then(function () { return resolve(); }).catch(function () { return reject; }) : resolve();
            });
        }
        else {
            if (this.auth) {
                return Security_1.Security.logout(this.auth).then(function () { return _this.auth = undefined; });
            }
            else {
                return Promise.resolve();
            }
        }
    };
    ArkaneConnect.prototype.addOnTokenRefreshCallback = function (tokenRefreshCallback) {
        if (tokenRefreshCallback) {
            Security_1.Security.onTokenUpdate = tokenRefreshCallback;
        }
    };
    ArkaneConnect.prototype.createSigner = function (windowMode, popupOptions) {
        if (!popupOptions || popupOptions.useOverlay == undefined) {
            popupOptions = { useOverlay: this.useOverlayWithPopup };
        }
        return Signer_1.SignerFactory.createSignerFor(windowMode || this.signUsing || this.windowMode, this._bearerTokenProvider, popupOptions);
    };
    ArkaneConnect.prototype.isPopupSigner = function (signer) {
        return typeof signer.closePopup !== 'undefined';
    };
    /* Deprecated - Use flows.authenticate instead */
    ArkaneConnect.prototype.authenticate = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.flows.authenticate(options)];
            });
        });
    };
    /* Deprecated - Use flows.manageWallets instead */
    ArkaneConnect.prototype.manageWallets = function (chain, options) {
        return this.flows.manageWallets(chain, options);
    };
    /* Deprecated - Use flows.linkWallets instead */
    ArkaneConnect.prototype.linkWallets = function (options) {
        return this.flows.linkWallets(options);
    };
    ArkaneConnect.prototype._afterAuthenticationForFlowUse = function (loginResult) {
        return this.afterAuthentication(loginResult);
    };
    ArkaneConnect.prototype.afterAuthentication = function (loginResult) {
        // this.auth is needed for the bearerTokenProvider
        this.loginResult = loginResult;
        this.auth = loginResult.keycloak;
        return {
            auth: this.auth,
            isAuthenticated: loginResult.authenticated,
            authenticated: function (callback) {
                if (loginResult.authenticated && loginResult.keycloak) {
                    callback(loginResult.keycloak);
                }
                return this;
            },
            notAuthenticated: function (callback) {
                if (!loginResult.authenticated) {
                    callback(loginResult.keycloak);
                }
                return this;
            },
        };
    };
    return ArkaneConnect;
}());
exports.ArkaneConnect = ArkaneConnect;
//# sourceMappingURL=connect.js.map