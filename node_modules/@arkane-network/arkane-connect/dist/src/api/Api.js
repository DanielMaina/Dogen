"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var Utils_1 = tslib_1.__importDefault(require("../utils/Utils"));
var Api = /** @class */ (function () {
    function Api(baseURL, tokenProvider) {
        var _this = this;
        ////////////
        // Chains //
        ////////////
        this.getAvailableSecretTypes = function () {
            return _this.processResponse(_this.http.get("chains"));
        };
        ////////////
        // Wallet //
        ////////////
        this.getWallets = function (params) {
            params = (params && Utils_1.default.removeNulls(params)) || {};
            return _this.processResponse(_this.http.get('wallets', { params: params }));
        };
        this.getWallet = function (walletId) {
            return _this.processResponse(_this.http.get("wallets/" + walletId));
        };
        this.getBalance = function (walletId) {
            return _this.processResponse(_this.http.get("wallets/" + walletId + "/balance"));
        };
        this.getTokenBalances = function (walletId) {
            return _this.processResponse(_this.http.get("wallets/" + walletId + "/balance/tokens"));
        };
        this.getTokenBalance = function (walletId, tokenAddress) {
            return _this.processResponse(_this.http.get("wallets/" + walletId + "/balance/tokens/" + tokenAddress));
        };
        this.getNonfungibles = function (walletId) {
            return _this.processResponse(_this.http.get("wallets/" + walletId + "/nonfungibles"));
        };
        this.getNonfungiblesByAddress = function (secretType, walletAddress) {
            return _this.processResponse(_this.http.get("wallets/" + secretType + "/" + walletAddress + "/nonfungibles"));
        };
        this.getAllNonfungibles = function (secretTypes) {
            var queryParams = secretTypes && secretTypes.length > 0
                ? "?" + secretTypes.map(function (st) { return "secretType=" + st; }).join("&")
                : "";
            return _this.processResponse(_this.http.get("wallets/nonfungibles" + queryParams));
        };
        this.unlink = function (walletId) {
            return _this.processResponse(_this.http.delete("wallets/" + walletId + "/link"));
        };
        /////////////
        // Profile //
        /////////////
        this.getProfile = function () {
            return _this.processResponse(_this.http.get('profile'));
        };
        //////////////////
        // Transactions //
        //////////////////
        this.getPendingTransactions = function () {
            return _this.processResponse(_this.http.get('transactions'));
        };
        this.deleteTransaction = function (transactionId) {
            return _this.processResponse(_this.http.delete("transactions/" + transactionId));
        };
        this.getTransactionStatus = function (transactionHash, secretType) {
            return _this.processResponse(_this.http.get("transactions/" + secretType + "/" + transactionHash + "/status"));
        };
        this.http = axios_1.default.create({
            baseURL: baseURL.endsWith('/') ? baseURL.substring(0, baseURL.length - 1) : baseURL,
        });
        if (tokenProvider) {
            this.http.interceptors.request.use(function (config) {
                var bearerToken = tokenProvider();
                if (!bearerToken) {
                    throw new Error('Not authenticated');
                }
                config.headers.common = { Authorization: 'Bearer ' + bearerToken };
                return config;
            });
        }
    }
    Api.prototype.processResponse = function (axiosPromise) {
        return new Promise(function (resolve, reject) {
            axiosPromise.then(function (axiosRes) {
                if (axiosRes.data.success) {
                    if (axiosRes.data.result) {
                        resolve(axiosRes.data.result);
                    }
                    else {
                        resolve();
                    }
                }
                else {
                    reject(axiosRes.data.errors);
                }
            })
                .catch(function (error) {
                if (error.response && error.response.data) {
                    reject(error.response.data.errors);
                }
                else if (error.message) {
                    var code = error.message.indexOf('authenticat') >= 0 ? 'auth.error' : 'unknown.error';
                    reject([{ code: code, message: error.message }]);
                }
                else {
                    reject([{ code: 'unknown.error', message: 'An unknown error occured' }]);
                }
            });
        });
    };
    return Api;
}());
exports.Api = Api;
//# sourceMappingURL=Api.js.map