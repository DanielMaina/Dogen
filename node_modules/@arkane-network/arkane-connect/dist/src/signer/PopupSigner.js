"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BuildTransactionRequest_1 = require("../models/transaction/build/BuildTransactionRequest");
var BuildSimpleTransactionRequest_1 = require("../models/transaction/build/BuildSimpleTransactionRequest");
var BuildTokenTransferRequest_1 = require("../models/transaction/build/BuildTokenTransferRequest");
var BuildNftTransferRequest_1 = require("../models/transaction/build/BuildNftTransferRequest");
var BuildGasTransferRequest_1 = require("../models/transaction/build/BuildGasTransferRequest");
var BuildContractExecutionRequest_1 = require("../models/transaction/build/BuildContractExecutionRequest");
var Popup_1 = tslib_1.__importDefault(require("../popup/Popup"));
var EventTypes_1 = require("../types/EventTypes");
var Utils_1 = tslib_1.__importDefault(require("../utils/Utils"));
var BuildMessageSignRequest_1 = require("../models/transaction/build/BuildMessageSignRequest");
var BuildEip712SignRequest_1 = require("../models/transaction/build/BuildEip712SignRequest");
var PopupSigner = /** @class */ (function () {
    function PopupSigner(bearerTokenProvider, options) {
        var _this = this;
        this.bearerTokenProvider = bearerTokenProvider;
        this.popup = new PopupSignerPopup(Utils_1.default.urls.connect + "/popup/transaction/init.html", this.bearerTokenProvider, options);
        window.addEventListener('beforeunload', function () {
            _this.closePopup();
        });
    }
    PopupSigner.prototype.closePopup = function () {
        this.popup.close();
    };
    PopupSigner.prototype.isOpen = function () {
        return this.popup.isOpen();
    };
    PopupSigner.prototype.sign = function (signatureRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                signatureRequest.hash = typeof signatureRequest.hash === 'undefined' ? true : signatureRequest.hash;
                signatureRequest.prefix = typeof signatureRequest.hash === 'undefined' ? true : signatureRequest.prefix;
                return [2 /*return*/, this.signRequest(signatureRequest)];
            });
        });
    };
    PopupSigner.prototype.signMessage = function (buildDate) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.signRequest(BuildMessageSignRequest_1.BuildMessageSignRequest.fromData(buildDate))];
            });
        });
    };
    PopupSigner.prototype.signEip712 = function (buildDate) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.signRequest(BuildEip712SignRequest_1.BuildEip712SignRequest.fromData(buildDate))];
            });
        });
    };
    /** Deprecated since 1.1.9. Use sign instead */
    PopupSigner.prototype.signTransaction = function (signatureRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.sign(signatureRequest)];
            });
        });
    };
    PopupSigner.prototype.executeNativeTransaction = function (transactionRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.execute(transactionRequest)];
            });
        });
    };
    /** Deprecated since 1.4.0. Use transfer functions instead */
    PopupSigner.prototype.executeTransaction = function (genericTransactionRequestOrTransactionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (typeof genericTransactionRequestOrTransactionId === 'string') {
                    return [2 /*return*/, this.execute({ transactionId: genericTransactionRequestOrTransactionId })];
                }
                else {
                    return [2 /*return*/, this.execute(BuildTransactionRequest_1.BuildTransactionRequest.fromData(genericTransactionRequestOrTransactionId))];
                }
                return [2 /*return*/];
            });
        });
    };
    PopupSigner.prototype.executeTransfer = function (buildTransactionData) {
        return this.execute(BuildSimpleTransactionRequest_1.BuildSimpleTransactionRequest.fromData(buildTransactionData));
    };
    PopupSigner.prototype.executeTokenTransfer = function (buildTransactionData) {
        return this.execute(BuildTokenTransferRequest_1.BuildTokenTransferRequest.fromData(buildTransactionData));
    };
    PopupSigner.prototype.executeNftTransfer = function (buildTransactionData) {
        return this.execute(BuildNftTransferRequest_1.BuildNftTransferRequest.fromData(buildTransactionData));
    };
    PopupSigner.prototype.executeGasTransfer = function (buildTransactionData) {
        return this.execute(BuildGasTransferRequest_1.BuildGasTransferRequest.fromData(buildTransactionData));
    };
    PopupSigner.prototype.executeContract = function (buildTransactionData) {
        return this.execute(BuildContractExecutionRequest_1.BuildContractExecutionRequest.fromData(buildTransactionData));
    };
    PopupSigner.prototype.executeSavedTransaction = function (transactionId) {
        return this.handleRequest("execute/" + transactionId, {});
    };
    PopupSigner.prototype.resubmitTransaction = function (transactionId) {
        return this.handleRequest('resubmit', { transactionId: transactionId });
    };
    PopupSigner.prototype.cancelTransaction = function (transactionId) {
        return this.handleRequest('cancel', { transactionId: transactionId });
    };
    PopupSigner.prototype.confirm = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.handleRequest('confirm', request)];
            });
        });
    };
    PopupSigner.prototype.execute = function (requestData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.handleRequest('execute', requestData)];
            });
        });
    };
    PopupSigner.prototype.signRequest = function (requestData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.handleRequest('sign', requestData)];
            });
        });
    };
    PopupSigner.prototype.handleRequest = function (action, requestData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.popup.focus();
                return [2 /*return*/, this.popup
                        .sendData(action, Object.assign({}, requestData))
                        .finally(function () {
                        _this.closePopup();
                    })];
            });
        });
    };
    return PopupSigner;
}());
exports.PopupSigner = PopupSigner;
var PopupSignerPopup = /** @class */ (function (_super) {
    tslib_1.__extends(PopupSignerPopup, _super);
    function PopupSignerPopup(url, bearerTokenProvider, options) {
        var _this = _super.call(this, url, bearerTokenProvider, options) || this;
        _this.finishedEventType = EventTypes_1.EventTypes.SIGNER_FINISHED;
        _this.sendDataEventType = EventTypes_1.EventTypes.SEND_TRANSACTION_DATA;
        return _this;
    }
    PopupSignerPopup.prototype.sendData = function (action, requestData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onPopupMountedQueue.push(_this.attachFinishedListener(resolve, reject));
            _this.onPopupMountedQueue.push(_this.sendDataToPopup(action, requestData));
            _this.processPopupMountedQueue();
        });
    };
    PopupSignerPopup.prototype.sendDataToPopup = function (action, requestData) {
        var _this = this;
        return function () {
            if (_this.isOpen()) {
                _this.popupWindow.postMessage({ type: _this.sendDataEventType, params: { action: action, transactionRequest: requestData, bearerToken: _this.bearerTokenProvider() } }, Utils_1.default.urls.connect);
            }
        };
    };
    return PopupSignerPopup;
}(Popup_1.default));
//# sourceMappingURL=PopupSigner.js.map