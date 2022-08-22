"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var querystring_1 = tslib_1.__importDefault(require("querystring"));
var WindowMode_1 = require("../models/WindowMode");
var PopupWindow_1 = require("../popup/PopupWindow");
var EventTypes_1 = require("../types/EventTypes");
var Utils_1 = tslib_1.__importDefault(require("../utils/Utils"));
var Security = /** @class */ (function () {
    function Security() {
    }
    Security.getConfig = function (clientId) {
        return {
            'clientId': clientId || Utils_1.default.env.CONNECT_JS_CLIENT_ID,
            'realm': Utils_1.default.env.CONNECT_JS_REALM,
            'url': Utils_1.default.urls.login,
            'ssl-required': Utils_1.default.env.CONNECT_JS_SSL_REQUIRED,
            'public-client': Utils_1.default.env.CONNECT_JS_PUBLIC_CLIENT,
        };
    };
    Security.login = function (clientId, options) {
        switch (options && options.windowMode) {
            case WindowMode_1.WindowMode.POPUP:
                return Security.loginPopup(clientId, options);
            // case WindowMode.IFRAME:
            //     return Security.initLoginIFrame(clientId, options && options.iFrameSelector || '#login-iframe');
            default:
                return Security.loginRedirect(clientId, options);
        }
    };
    // public static initLoginIFrame(clientId: string, iFrameSelector: string) {
    //     return new Promise(async (resolve: (value?: LoginResult | PromiseLike<LoginResult>) => void, reject: (reason?: any) => void) => {
    //         Security.loginListener = await Security.createLoginListener(clientId, EventTypes.AUTHENTICATE, resolve, reject);
    //         window.addEventListener('message', Security.loginListener);
    //         Security.initialiseLoginIFrame(clientId, iFrameSelector);
    //     }) as Promise<LoginResult>;
    // }
    Security.loginRedirect = function (clientId, options) {
        var config = Security.getConfig(clientId);
        var loginOptions = {};
        if (options && options.idpHint) {
            loginOptions.idpHint = options.idpHint;
        }
        return this.keycloakLogin(config, options);
    };
    Security.loginPopup = function (clientId, options) {
        var closePopup = options ? options.closePopup : true;
        return Promise.race([
            Security.initialiseAuthenticatedListener(clientId, EventTypes_1.EventTypes.AUTHENTICATE, closePopup),
            Security.initialiseLoginPopup(clientId, options),
        ]);
    };
    Security.checkAuthenticated = function (clientId) {
        var authenticatedPromise = Security.initialiseAuthenticatedListener(clientId, EventTypes_1.EventTypes.CHECK_AUTHENTICATED);
        Security.initialiseCheckAuthenticatedIFrame(clientId);
        return authenticatedPromise;
    };
    Security.logout = function (auth) {
        var _this = this;
        if (auth.authenticated && auth.clientId) {
            return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var params_1, searchParams, _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!auth.clientId) return [3 /*break*/, 3];
                            params_1 = {
                                client_id: auth.clientId,
                                refresh_token: auth.refreshToken
                            };
                            searchParams = Object.keys(params_1).map(function (key) {
                                return encodeURIComponent(key) + '=' + encodeURIComponent(params_1[key]);
                            }).join('&');
                            return [4 /*yield*/, fetch(Utils_1.default.urls.login + '/realms/Arkane/protocol/openid-connect/logout', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                    },
                                    body: searchParams
                                })];
                        case 1:
                            _b.sent();
                            _a = Security;
                            return [4 /*yield*/, Security.createLogoutListener(EventTypes_1.EventTypes.LOGOUT, auth, resolve, reject)];
                        case 2:
                            _a.logoutListener = _b.sent();
                            window.addEventListener('message', Security.logoutListener);
                            Security.initialiseLogoutIFrame(auth.clientId);
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        }
        else {
            return Promise.resolve();
        }
    };
    Object.defineProperty(Security, "checkAuthenticatedURI", {
        get: function () {
            return Utils_1.default.urls.connect + "/checkAuthenticated";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Security, "authenticateURI", {
        get: function () {
            return Utils_1.default.urls.connect + "/authenticate";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Security, "logoutURI", {
        get: function () {
            return Utils_1.default.urls.connect + "/logout";
        },
        enumerable: true,
        configurable: true
    });
    Security.initialiseLoginPopup = function (clientId, options) {
        var origin = window.location.href.replace(window.location.search, '');
        var url = Security.authenticateURI + "?" + querystring_1.default.stringify({ clientId: clientId, origin: origin, env: Utils_1.default.rawEnvironment });
        if (options && options.idpHint) {
            var kcIdpHint = options.idpHint;
            if (kcIdpHint === 'twitter' || kcIdpHint === 'facebook') {
                kcIdpHint = 'arkane-' + kcIdpHint;
            }
            url += "&" + querystring_1.default.stringify({ kc_idp_hint: kcIdpHint });
        }
        Security.popupWindow = PopupWindow_1.PopupWindow.openNew(url, { useOverlay: false });
        return Security.initialiseIsLoginPopupClosedInterval();
    };
    Security.initialiseIsLoginPopupClosedInterval = function () {
        return new Promise(function (resolve, reject) {
            Security.isLoginPopupClosedInterval = window.setInterval(function () {
                if (Security.popupWindow.closed) {
                    Security.clearIsLoginPopupClosedInterval();
                    Security.cleanUp(EventTypes_1.EventTypes.AUTHENTICATE);
                    resolve({ authenticated: false });
                }
            }, 2000);
        });
    };
    Security.clearIsLoginPopupClosedInterval = function () {
        clearInterval(Security.isLoginPopupClosedInterval);
        delete Security.isLoginPopupClosedInterval;
    };
    // private static initialiseLoginIFrame(clientId: string, iframeSelector: string): HTMLIFrameElement {
    //     const iframe = document.querySelector(iframeSelector) as HTMLIFrameElement;
    //     const origin = window.location.href.replace(window.location.search, '');
    //     iframe.src = `${Security.authenticateURI}?${QueryString.stringify({clientId: clientId, origin: origin, env: Utils.rawEnvironment})}`;
    //     return iframe;
    // }
    Security.initialiseCheckAuthenticatedIFrame = function (clientId) {
        return this.initialiseIFrame(clientId, Security.AUTH_IFRAME_ID, Security.checkAuthenticatedURI);
    };
    Security.initialiseLogoutIFrame = function (clientId) {
        return this.initialiseIFrame(clientId, Security.LOGOUT_IFRAME_ID, Security.logoutURI);
    };
    Security.initialiseIFrame = function (clientId, iframeID, uri) {
        var iframe = document.getElementById(iframeID);
        var isIframeInBody = true;
        if (!iframe) {
            isIframeInBody = false;
            iframe = document.createElement('iframe');
        }
        var origin = window.location.href.replace(window.location.search, '');
        iframe.src = uri + "?" + querystring_1.default.stringify({ clientId: clientId, origin: origin, env: Utils_1.default.rawEnvironment });
        iframe.hidden = true;
        iframe.id = iframeID;
        iframe.setAttribute('style', 'display: none!important;');
        document.body.appendChild(iframe);
        if (!isIframeInBody) {
            document.body.appendChild(iframe);
        }
        return iframe;
    };
    Security.setUpdateTokenInterval = function () {
        var _this = this;
        if (Security.updateTokenInterval) {
            clearInterval(Security.updateTokenInterval);
            Security.updateTokenInterval = null;
        }
        Security.updateTokenInterval = setInterval(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                new Promise(function (resolve, reject) {
                    if (Security.keycloak) {
                        Security.keycloak.updateToken(70).then(function (refreshed) {
                            resolve(refreshed);
                        });
                    }
                    else {
                        reject(false);
                    }
                }).then(function (refreshed) {
                    if (refreshed) {
                        if (Security.onTokenUpdate && Security.keycloak.token) {
                            Security.onTokenUpdate(Security.keycloak.token);
                        }
                    }
                }).catch(function () {
                    console.error('failed to refresh token');
                    clearInterval(Security.updateTokenInterval);
                    Security.updateTokenInterval = null;
                });
                return [2 /*return*/];
            });
        }); }, 60000);
    };
    Security.keycloakLogin = function (config, loginOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var Keycloak;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require('keycloak-js')); })];
                    case 1:
                        Keycloak = _a.sent();
                        Security.keycloak = Keycloak.default(config);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                Security.keycloak
                                    .init({}).then(function () { return Security.keycloak
                                    .login(loginOptions)
                                    .then(function (authenticated) {
                                    if (authenticated) {
                                        Security.setUpdateTokenInterval();
                                    }
                                    resolve({
                                        keycloak: Security.keycloak,
                                        authenticated: authenticated,
                                    });
                                })
                                    .catch(function (e) {
                                    reject(e);
                                }); });
                            })];
                }
            });
        });
    };
    Security.initKeycloak = function (config, initOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var Keycloak;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require('keycloak-js')); })];
                    case 1:
                        Keycloak = _a.sent();
                        Security.keycloak = Keycloak.default(config);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                Security.keycloak
                                    .init(initOptions)
                                    .then(function (authenticated) {
                                    if (authenticated) {
                                        Security.setUpdateTokenInterval();
                                    }
                                    resolve({
                                        keycloak: Security.keycloak,
                                        authenticated: authenticated,
                                    });
                                })
                                    .catch(function (e) {
                                    reject(e);
                                });
                            })];
                }
            });
        });
    };
    Security.removeLoginState = function () {
        var url = window.location.href;
        var fragmentIndex = url.indexOf('#');
        if (fragmentIndex !== -1) {
            var newURL = url.substring(0, fragmentIndex);
            window.history.replaceState({}, '', newURL);
        }
    };
    Security.cleanUp = function (eventType, closePopup) {
        if (closePopup === void 0) { closePopup = true; }
        if (Security.authenticatedListener) {
            window.removeEventListener('message', Security.authenticatedListener);
            delete Security.authenticatedListener;
        }
        if (eventType === EventTypes_1.EventTypes.CHECK_AUTHENTICATED) {
            var iframe = document.getElementById(Security.AUTH_IFRAME_ID);
            if (iframe) {
                iframe.remove();
            }
        }
        else if (eventType === EventTypes_1.EventTypes.AUTHENTICATE) {
            if (closePopup && Security.popupWindow && !Security.popupWindow.closed) {
                Security.popupWindow.close();
            }
        }
    };
    Security.AUTH_IFRAME_ID = 'arkane-auth-iframe';
    Security.LOGOUT_IFRAME_ID = 'arkane-logout-iframe';
    Security.initialiseAuthenticatedListener = function (clientId, eventType, closePopup) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Security.authenticatedListener = function (message) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var keycloakResult, initOptions, loginResult, e_1;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(message && message.origin === Utils_1.default.urls.connect && message.data && message.data.type === eventType)) return [3 /*break*/, 6];
                                        if (Security.isLoginPopupClosedInterval) {
                                            Security.clearIsLoginPopupClosedInterval();
                                        }
                                        if (!message.data.authenticated) return [3 /*break*/, 5];
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        Security.cleanUp(eventType, closePopup);
                                        keycloakResult = message.data.keycloak;
                                        initOptions = {
                                            onLoad: 'check-sso',
                                            token: keycloakResult.token,
                                            refreshToken: keycloakResult.refreshToken,
                                            idToken: keycloakResult.idToken,
                                            timeSkew: keycloakResult.timeSkew,
                                            checkLoginIframe: false,
                                        };
                                        // Remove the login state from the URL when tokens are already present (the checkAuthenticated iframe already handled it)
                                        Security.removeLoginState();
                                        return [4 /*yield*/, Security.initKeycloak(Security.getConfig(clientId), initOptions)];
                                    case 2:
                                        loginResult = _a.sent();
                                        resolve({
                                            keycloak: loginResult.keycloak,
                                            authenticated: loginResult.authenticated,
                                            popupWindow: Security.popupWindow
                                        });
                                        return [3 /*break*/, 4];
                                    case 3:
                                        e_1 = _a.sent();
                                        reject({ error: e_1 });
                                        return [3 /*break*/, 4];
                                    case 4: return [3 /*break*/, 6];
                                    case 5:
                                        resolve({ authenticated: false });
                                        _a.label = 6;
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); };
                        window.addEventListener('message', Security.authenticatedListener);
                    })];
            });
        });
    };
    Security.createLogoutListener = function (eventType, auth, resolve, reject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, function (message) {
                        if (message && message.origin === Utils_1.default.urls.connect && message.data && message.data.type === eventType) {
                            if (auth.authenticated) {
                                if (!message.data.authenticated) {
                                    auth.onAuthLogout && auth.onAuthLogout();
                                    resolve();
                                }
                                else {
                                    reject();
                                }
                            }
                            else {
                                resolve();
                            }
                        }
                    }];
            });
        });
    };
    return Security;
}());
exports.Security = Security;
//# sourceMappingURL=Security.js.map