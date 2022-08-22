"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BuildTransactionRequest_1 = require("../models/transaction/build/BuildTransactionRequest");
var Utils_1 = tslib_1.__importDefault(require("../utils/Utils"));
var BuildGasTransferRequest_1 = require("../models/transaction/build/BuildGasTransferRequest");
var BuildTokenTransferRequest_1 = require("../models/transaction/build/BuildTokenTransferRequest");
var BuildNftTransferRequest_1 = require("../models/transaction/build/BuildNftTransferRequest");
var BuildSimpleTransactionRequest_1 = require("../models/transaction/build/BuildSimpleTransactionRequest");
var BuildContractExecutionRequest_1 = require("../models/transaction/build/BuildContractExecutionRequest");
var BuildMessageSignRequest_1 = require("../models/transaction/build/BuildMessageSignRequest");
var BuildEip712SignRequest_1 = require("../models/transaction/build/BuildEip712SignRequest");
var RedirectSigner = /** @class */ (function () {
    function RedirectSigner(bearerTokenProvider) {
        this.bearerTokenProvider = bearerTokenProvider;
    }
    RedirectSigner.prototype.executeNativeTransaction = function (transactionRequest, redirectOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Utils_1.default.http().postInForm(Utils_1.default.urls.connect + "/transaction/execute/" + transactionRequest.type.toLowerCase(), transactionRequest, _this.bearerTokenProvider, redirectOptions);
            resolve();
        });
    };
    /** @Deprecated */
    RedirectSigner.prototype.executeTransaction = function (buildTransactionRequestOrTransactionId, redirectOptions) {
        if (typeof buildTransactionRequestOrTransactionId === 'string') {
            return this.executeSavedTransaction(buildTransactionRequestOrTransactionId, redirectOptions);
        }
        else {
            return this.executeProvidedTransaction(BuildTransactionRequest_1.BuildTransactionRequest.fromData(buildTransactionRequestOrTransactionId), redirectOptions);
        }
    };
    RedirectSigner.prototype.executeTransfer = function (buildTransactionData, redirectOptions) {
        return this.executeProvidedTransaction(BuildSimpleTransactionRequest_1.BuildSimpleTransactionRequest.fromData(buildTransactionData), redirectOptions);
    };
    RedirectSigner.prototype.executeTokenTransfer = function (buildTransactionData, redirectOptions) {
        return this.executeProvidedTransaction(BuildTokenTransferRequest_1.BuildTokenTransferRequest.fromData(buildTransactionData), redirectOptions);
    };
    RedirectSigner.prototype.executeNftTransfer = function (buildTransactionData, redirectOptions) {
        return this.executeProvidedTransaction(BuildNftTransferRequest_1.BuildNftTransferRequest.fromData(buildTransactionData), redirectOptions);
    };
    RedirectSigner.prototype.executeGasTransfer = function (buildTransactionData, redirectOptions) {
        return this.executeProvidedTransaction(BuildGasTransferRequest_1.BuildGasTransferRequest.fromData(buildTransactionData), redirectOptions);
    };
    RedirectSigner.prototype.executeContract = function (buildTransactionData, redirectOptions) {
        return this.executeProvidedTransaction(BuildContractExecutionRequest_1.BuildContractExecutionRequest.fromData(buildTransactionData), redirectOptions);
    };
    RedirectSigner.prototype.executeSavedTransaction = function (transactionId, redirectOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Utils_1.default.http().postInForm(Utils_1.default.urls.connect + "/transaction/execute/" + transactionId, {}, _this.bearerTokenProvider, redirectOptions);
            resolve();
        });
    };
    RedirectSigner.prototype.resubmitTransaction = function (transactionId, redirectOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Utils_1.default.http().postInForm(Utils_1.default.urls.connect + "/transaction/resubmit/" + transactionId, {}, _this.bearerTokenProvider, redirectOptions);
            resolve();
        });
    };
    RedirectSigner.prototype.cancelTransaction = function (transactionId, redirectOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Utils_1.default.http().postInForm(Utils_1.default.urls.connect + "/transaction/cancel/" + transactionId, {}, _this.bearerTokenProvider, redirectOptions);
            resolve();
        });
    };
    RedirectSigner.prototype.executeProvidedTransaction = function (buildTransactionData, redirectOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Utils_1.default.http().postInForm(Utils_1.default.urls.connect + "/transaction/execute", buildTransactionData, _this.bearerTokenProvider, redirectOptions);
            resolve();
        });
    };
    RedirectSigner.prototype.sign = function (signatureRequest, redirectOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Utils_1.default.http().postInForm(Utils_1.default.urls.connect + "/transaction/sign/" + signatureRequest.type.toLowerCase(), signatureRequest, _this.bearerTokenProvider, redirectOptions);
            resolve();
        });
    };
    RedirectSigner.prototype.signMessage = function (buildData, redirectOptions) {
        return this.signProvidedSignature(BuildMessageSignRequest_1.BuildMessageSignRequest.fromData(buildData), redirectOptions);
    };
    RedirectSigner.prototype.signEip712 = function (buildData, redirectOptions) {
        return this.signProvidedSignature(BuildEip712SignRequest_1.BuildEip712SignRequest.fromData(buildData), redirectOptions);
    };
    RedirectSigner.prototype.signProvidedSignature = function (buildSignatureData, redirectOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Utils_1.default.http().postInForm(Utils_1.default.urls.connect + "/transaction/sign", buildSignatureData, _this.bearerTokenProvider, redirectOptions);
            resolve();
        });
    };
    /** Deprecated since v1.1.9: Use 'sign' instead. */
    RedirectSigner.prototype.signTransaction = function (signatureRequest, redirectOptions) {
        return this.sign(signatureRequest, redirectOptions);
    };
    RedirectSigner.prototype.confirm = function (request, redirectOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Utils_1.default.http().postInForm(Utils_1.default.urls.connect + "/confirm/" + request.confirmationRequestType.toLowerCase(), request, _this.bearerTokenProvider, redirectOptions);
                        resolve();
                    })];
            });
        });
    };
    return RedirectSigner;
}());
exports.RedirectSigner = RedirectSigner;
//# sourceMappingURL=RedirectSigner.js.map