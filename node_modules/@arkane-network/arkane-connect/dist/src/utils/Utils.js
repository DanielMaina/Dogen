"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var env_1 = tslib_1.__importDefault(require("../env"));
var QueryString = tslib_1.__importStar(require("querystring"));
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Object.defineProperty(Utils, "rawEnvironment", {
        get: function () {
            return Utils.rawEnvironmentHolder;
        },
        set: function (env) {
            Utils.rawEnvironmentHolder = env;
            var split = env.split('-');
            Utils.environment = split[0];
            Utils.connectEnvironment = split.length > 1 && split[1] || '';
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Utils, "env", {
        get: function () {
            return env_1.default;
        },
        enumerable: true,
        configurable: true
    });
    Utils.environments = function () {
        return {
            'qa2': {
                api: 'https://api-qa.arkane.network/api',
                connect: 'https://connect-qa2.arkane.network',
                login: 'https://login-qa.arkane.network/auth',
            }
        };
    };
    Object.defineProperty(Utils, "urls", {
        get: function () {
            var postfix = '';
            switch (Utils.environment) {
                case 'local':
                    postfix = 'tst1';
                    break;
                case 'prod':
                case 'production':
                    postfix = '';
                    break;
                default:
                    postfix = Utils.environment;
            }
            var environment = this.environments()[postfix];
            if (environment) {
                return {
                    api: environment.api,
                    connect: Utils.environment === 'local' || Utils.connectEnvironment === 'local' ? 'http://127.0.0.1:8181' : environment.connect,
                    login: environment.login,
                };
            }
            else {
                return {
                    api: Utils.environment === 'local' ? 'http://127.0.0.1:8581/api' : "https://api" + (postfix ? '-' + postfix : '') + ".arkane.network/api",
                    connect: Utils.environment === 'local' || Utils.connectEnvironment === 'local' ? 'http://127.0.0.1:8181' : "https://connect" + (postfix ? '-' + postfix : '') + ".arkane.network",
                    login: "https://login" + (postfix ? '-' + postfix : '') + ".arkane.network/auth",
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Utils.removeNulls = function (obj) {
        return Object.keys(obj)
            .filter(function (key) { return obj[key] !== null && obj[key] !== undefined; }) // Remove undef. and null.
            .reduce(function (newObj, key) {
            var _a, _b;
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                return Object.assign(newObj, (_a = {}, _a[key] = Utils.removeNulls(obj[key]), _a));
            }
            else {
                return Object.assign(newObj, (_b = {}, _b[key] = obj[key], _b));
            }
        }, {});
    };
    Utils.removeNullsAndEmpty = function (obj) {
        return Object.keys(obj)
            .filter(function (key) { return obj[key] !== null && obj[key] !== undefined && obj[key] !== ''; }) // Remove undef. and null.
            .reduce(function (newObj, key) {
            var _a, _b;
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                return Object.assign(newObj, (_a = {}, _a[key] = Utils.removeNullsAndEmpty(obj[key]), _a));
            }
            else {
                return Object.assign(newObj, (_b = {}, _b[key] = obj[key], _b));
            }
        }, {});
    };
    Utils.messages = function () {
        return {
            hasValidOrigin: function (message) {
                return message.origin === Utils.urls.connect;
            },
            hasType: function (message) {
                return message.data && message.data.type && message.data.type !== '';
            },
            isOfType: function (message, eventType) {
                return Utils.messages().hasType(message) && message.data.type === eventType.toString();
            },
            hasCorrectCorrelationID: function (message, correlationID) {
                return message.data && message.data.correlationID === correlationID;
            }
        };
    };
    Utils.formatNumber = function (value, minDecimals, maxDecimals) {
        if (minDecimals === void 0) { minDecimals = 2; }
        if (maxDecimals === void 0) { maxDecimals = minDecimals; }
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: minDecimals,
            maximumFractionDigits: maxDecimals,
        }).format(value);
    };
    Utils.rawValue = function () {
        return {
            toTokenValue: function (rawValue, decimals) { return rawValue / Math.pow(10, decimals); },
            toGwei: function (rawValue) { return rawValue / Math.pow(10, 9); },
        };
    };
    Utils.gwei = function () {
        return {
            toRawValue: function (rawValue) { return rawValue * Math.pow(10, 9); },
        };
    };
    Utils.openExternalUrl = function (url, targetBlank) {
        if (targetBlank === void 0) { targetBlank = true; }
        if (targetBlank) {
            var newWindow = window.open('', '_blank');
            if (newWindow) {
                newWindow.opener = null;
                newWindow.location.assign(url);
            }
            return newWindow;
        }
        else {
            window.location.href = url;
            return window;
        }
    };
    Utils.zeroIfUndefined = function (numberToVerify) {
        return numberToVerify ? numberToVerify : 0;
    };
    Utils.defaultRedirectUriIfNotPresent = function (options) {
        if (options === void 0) { options = {}; }
        if (!options.redirectUri) {
            options.redirectUri = window.location.href;
        }
        return options;
    };
    Utils.http = function () {
        return {
            postInForm: function (to, request, bearerTokenProvider, options) {
                options = Utils.defaultRedirectUriIfNotPresent(options);
                var form = document.createElement('form');
                form.action = Utils.http().buildUrl(to, options);
                form.method = 'POST';
                var inputBearer = document.createElement('input');
                inputBearer.type = 'hidden';
                inputBearer.name = 'bearerToken';
                inputBearer.value = bearerTokenProvider();
                form.appendChild(inputBearer);
                var inputData = document.createElement('input');
                inputData.type = 'hidden';
                inputData.name = 'data';
                inputData.value = JSON.stringify(tslib_1.__assign({}, request));
                form.appendChild(inputData);
                document.body.appendChild(form);
                form.submit();
            },
            buildUrl: function (to, options) {
                if (options && (options.redirectUri || options.correlationID)) {
                    var params = {};
                    if (options.redirectUri) {
                        params.redirectUri = options.redirectUri;
                    }
                    if (options.correlationID) {
                        params.cid = options.correlationID;
                    }
                    return Utils.http().addRequestParams(to, params);
                }
                return to;
            },
            addRequestParams: function (url, params) {
                if (url && params) {
                    var paramsAsString = QueryString.stringify(params);
                    if (url && url.indexOf('?') > 0) {
                        return url + "&" + paramsAsString;
                    }
                    else {
                        return url + "?" + paramsAsString;
                    }
                }
                return url;
            }
        };
    };
    Utils.rawEnvironmentHolder = '';
    Utils.environment = '';
    Utils.connectEnvironment = '';
    return Utils;
}());
exports.default = Utils;
//# sourceMappingURL=Utils.js.map