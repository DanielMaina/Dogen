"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArkaneWalletSubProvider = void 0;
var tslib_1 = require("tslib");
var arkane_connect_1 = require("@arkane-network/arkane-connect");
var base_wallet_subprovider_1 = require("@0x/subproviders/lib/src/subproviders/base_wallet_subprovider");
var ArkaneWalletSubProvider = /** @class */ (function (_super) {
    tslib_1.__extends(ArkaneWalletSubProvider, _super);
    function ArkaneWalletSubProvider(options) {
        var _this = _super.call(this) || this;
        _this.wallets = [];
        _this.authenticated = false;
        var connectConstructorOptions = {
            environment: options.environment || 'production',
            bearerTokenProvider: options.bearerTokenProvider,
        };
        if (options.signMethod) {
            Object.assign(connectConstructorOptions, { signUsing: options.signMethod == 'POPUP' ? arkane_connect_1.SignMethod.POPUP : arkane_connect_1.SignMethod.REDIRECT });
        }
        if (options.windowMode) {
            Object.assign(connectConstructorOptions, { windowMode: options.windowMode == 'POPUP' ? arkane_connect_1.WindowMode.POPUP : arkane_connect_1.WindowMode.REDIRECT });
        }
        _this.arkaneConnect = new arkane_connect_1.ArkaneConnect(options.clientId, connectConstructorOptions);
        _this.options = options;
        return _this;
    }
    ArkaneWalletSubProvider.prototype.startGetAccountFlow = function (authenticationOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var that;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (authenticationOptions) {
                    this.options.authenticationOptions = authenticationOptions;
                }
                that = this;
                return [2 /*return*/, this.arkaneConnect.flows.getAccount(this.options.secretType || arkane_connect_1.SecretType.ETHEREUM, this.options.authenticationOptions)
                        .then(function (account) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        if (!account.isAuthenticated) {
                                            reject('not-authenticated');
                                        }
                                        else if (account.wallets && account.wallets.length <= 0) {
                                            reject('no-wallet-linked');
                                        }
                                        else {
                                            that.authenticated = true;
                                            that.wallets = account.wallets;
                                            that.lastWalletsFetch = Date.now();
                                            resolve(account);
                                        }
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
            });
        });
    };
    ArkaneWalletSubProvider.prototype.refreshWallets = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var newWallets, account;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.arkaneConnect.api.getWallets({ secretType: this.options.secretType || arkane_connect_1.SecretType.ETHEREUM, includeBalance: false })];
                    case 1:
                        newWallets = _a.sent();
                        if (!(!newWallets || newWallets.length < 1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.arkaneConnect.flows.getAccount(this.options.secretType || arkane_connect_1.SecretType.ETHEREUM, this.options.authenticationOptions)];
                    case 2:
                        account = _a.sent();
                        newWallets = account.wallets;
                        _a.label = 3;
                    case 3:
                        this.wallets = newWallets;
                        return [2 /*return*/, newWallets];
                }
            });
        });
    };
    /**
     * Retrieve the accounts associated with the eth-lightwallet instance.
     * This method is implicitly called when issuing a `eth_accounts` JSON RPC request
     * via your providerEngine instance.
     *
     * @return An array of accounts
     */
    ArkaneWalletSubProvider.prototype.getAccountsAsync = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var that, promise;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                that = this;
                if (!this.authenticated) {
                    promise = this.startGetAccountFlow();
                }
                else if (this.shouldRefreshWallets()) {
                    this.lastWalletsFetch = Date.now();
                    promise = this.refreshWallets();
                }
                else {
                    promise = Promise.resolve();
                }
                return [2 /*return*/, promise.then(function () {
                        return _this.wallets.map(function (wallet) { return wallet.address; });
                    })];
            });
        });
    };
    ArkaneWalletSubProvider.prototype.shouldRefreshWallets = function () {
        return !this.lastWalletsFetch
            || (Date.now() - this.lastWalletsFetch) > 5000;
    };
    ArkaneWalletSubProvider.prototype.checkAuthenticated = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.arkaneConnect.checkAuthenticated().then(function (authResult) {
                        _this.authenticated = authResult.isAuthenticated;
                        return authResult;
                    })];
            });
        });
    };
    /**
     * Signs a transaction with the account specificed by the `from` field in txParams.
     * If you've added this Subprovider to your app's provider, you can simply send
     * an `eth_sendTransaction` JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param txParams Parameters of the transaction to sign
     * @return Signed transaction hex string
     */
    ArkaneWalletSubProvider.prototype.signTransactionAsync = function (txParams) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var signer;
            return tslib_1.__generator(this, function (_a) {
                signer = this.arkaneConnect.createSigner();
                return [2 /*return*/, signer.signTransaction(this.constructEthereumTransationSignatureRequest(txParams))
                        .then(function (result) {
                        if (result.status === 'SUCCESS') {
                            return result.result.signedTransaction;
                        }
                        else {
                            throw new Error((result.errors && result.errors.join(", ")));
                        }
                    })];
            });
        });
    };
    ArkaneWalletSubProvider.prototype.constructEthereumTransationSignatureRequest = function (txParams) {
        var type = arkane_connect_1.SignatureRequestType.ETHEREUM_TRANSACTION;
        if (this.options.secretType && this.options.secretType == arkane_connect_1.SecretType.ETHEREUM) {
            type = arkane_connect_1.SignatureRequestType.ETHEREUM_TRANSACTION;
        }
        else if (this.options.secretType && this.options.secretType == arkane_connect_1.SecretType.MATIC) {
            type = arkane_connect_1.SignatureRequestType.MATIC_TRANSACTION;
        }
        else if (this.options.secretType && this.options.secretType == arkane_connect_1.SecretType.BSC) {
            type = arkane_connect_1.SignatureRequestType.BSC_TRANSACTION;
        }
        else if (this.options.secretType && this.options.secretType == arkane_connect_1.SecretType.AVAC) {
            type = arkane_connect_1.SignatureRequestType.AVAC_TRANSACTION;
        }
        var retVal = {
            gasPrice: txParams.gasPrice ? BigInt(txParams.gasPrice).toString(10) : txParams.gasPrice,
            gas: txParams.gas ? BigInt(txParams.gas).toString(10) : txParams.gas,
            to: txParams.to,
            nonce: txParams.nonce ? BigInt(txParams.nonce).toString(10) : txParams.nonce,
            data: (txParams.data) || '0x',
            value: txParams.value ? BigInt(txParams.value).toString(10) : "0",
            submit: false,
            type: type,
            walletId: this.getWalletIdFrom(txParams.from),
        };
        return retVal;
    };
    /**
     * Sign a personal Ethereum signed message. The signing account will be the account
     * associated with the provided address.
     * If you've added this Subprovider to your app's provider, you can simply send an `eth_sign`
     * or `personal_sign` JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param data Hex string message to sign
     * @param address Address of the account to sign with
     * @return Signature hex string (order: rsv)
     */
    ArkaneWalletSubProvider.prototype.signPersonalMessageAsync = function (data, address) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var signer, type;
            return tslib_1.__generator(this, function (_a) {
                signer = this.arkaneConnect.createSigner();
                type = arkane_connect_1.SignatureRequestType.ETHEREUM_RAW;
                if (this.options.secretType && this.options.secretType == arkane_connect_1.SecretType.ETHEREUM) {
                    type = arkane_connect_1.SignatureRequestType.ETHEREUM_RAW;
                }
                else if (this.options.secretType && this.options.secretType == arkane_connect_1.SecretType.MATIC) {
                    type = arkane_connect_1.SignatureRequestType.MATIC_RAW;
                }
                else if (this.options.secretType && this.options.secretType == arkane_connect_1.SecretType.BSC) {
                    type = arkane_connect_1.SignatureRequestType.BSC_RAW;
                }
                else if (this.options.secretType && this.options.secretType == arkane_connect_1.SecretType.AVAC) {
                    type = arkane_connect_1.SignatureRequestType.AVAC_RAW;
                }
                return [2 /*return*/, signer.signTransaction({
                        type: type,
                        walletId: this.getWalletIdFrom(address),
                        data: data
                    })
                        .then(function (result) {
                        if (result.status === 'SUCCESS') {
                            return result.result.signature;
                        }
                        else {
                            throw new Error((result.errors && result.errors.join(", ")));
                        }
                    })];
            });
        });
    };
    /**
     * Sign an EIP712 Typed Data message. The signing address will associated with the provided address.
     * If you've added this Subprovider to your app's provider, you can simply send an `eth_signTypedData`
     * JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param address Address of the account to sign with
     * @param data the typed data object
     * @return Signature hex string (order: rsv)
     */
    ArkaneWalletSubProvider.prototype.signTypedDataAsync = function (address, typedData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var signer, request;
            return tslib_1.__generator(this, function (_a) {
                signer = this.arkaneConnect.createSigner();
                if (typeof typedData === 'string') {
                    typedData = JSON.parse(typedData);
                }
                request = {
                    data: typedData,
                    walletId: this.getWalletIdFrom(address),
                    secretType: this.options.secretType || arkane_connect_1.SecretType.ETHEREUM
                };
                return [2 /*return*/, signer.signEip712(request)
                        .then(function (result) {
                        if (result.status === 'SUCCESS') {
                            return result.result.signature;
                        }
                        else {
                            throw new Error((result.errors && result.errors.join(", ")));
                        }
                    })];
            });
        });
    };
    ArkaneWalletSubProvider.prototype.getWalletIdFrom = function (address) {
        var foundWallet = this.wallets.find(function (wallet) {
            return wallet.address.toLowerCase() === address.toLowerCase();
        });
        return (foundWallet && foundWallet.id) || '';
    };
    return ArkaneWalletSubProvider;
}(base_wallet_subprovider_1.BaseWalletSubprovider));
exports.ArkaneWalletSubProvider = ArkaneWalletSubProvider;
//# sourceMappingURL=ArkaneWalletSubProvider.js.map