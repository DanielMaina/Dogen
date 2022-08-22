"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PopupWindow_1 = require("./PopupWindow");
var EventTypes_1 = require("../types/EventTypes");
var Utils_1 = tslib_1.__importDefault(require("../utils/Utils"));
var Popup = /** @class */ (function () {
    function Popup(url, bearerTokenProvider, options) {
        this.onPopupMountedQueue = [];
        this.isPopupMounted = false;
        this.useOverlay = true;
        this.useOverlay = (options && typeof options.useOverlay !== 'undefined') ? options.useOverlay : true;
        this.correlationID = '' + Date.now() + Math.random();
        this.bearerTokenProvider = bearerTokenProvider;
        this.popupMountedListener = this.createPopupMountedListener(this.correlationID);
        window.addEventListener('message', this.popupMountedListener);
        url = Utils_1.default.http().addRequestParams(url, { cid: this.correlationID, webURI: Utils_1.default.urls.connect });
        this.popupWindow = PopupWindow_1.PopupWindow.openNew(url, { useOverlay: this.useOverlay });
    }
    Popup.clearPopupIntervals = function () {
        // Make sure, all intervals are cleared;
        Popup.popupIntervals.forEach(function (v, i) {
            clearInterval(Popup.popupIntervals[i]);
        });
        Popup.popupIntervals = [];
    };
    Popup.prototype.isOpen = function () {
        return this.popupWindow && !this.popupWindow.closed;
    };
    Popup.prototype.close = function () {
        if (this.popupMountedListener) {
            window.removeEventListener('message', this.popupMountedListener);
        }
        this.popupWindow.close();
    };
    Popup.prototype.focus = function () {
        this.popupWindow.focus();
    };
    Popup.prototype.attachFinishedListener = function (resolve, reject) {
        var _this = this;
        return function () {
            Popup.clearPopupIntervals();
            if (_this.finishedListener) {
                window.removeEventListener('message', _this.finishedListener);
                delete _this.finishedListener;
            }
            Popup.popupIntervals.push(_this.createPopupClosedListener(reject));
            _this.finishedListener = _this.createFinishedListener(resolve, reject);
            window.addEventListener('message', _this.finishedListener);
        };
    };
    Popup.prototype.createPopupMountedListener = function (correlationID) {
        var _this = this;
        return function (message) {
            if (Utils_1.default.messages().hasValidOrigin(message)
                && Utils_1.default.messages().hasCorrectCorrelationID(message, correlationID)
                && Utils_1.default.messages().isOfType(message, EventTypes_1.EventTypes.POPUP_MOUNTED)) {
                _this.isPopupMounted = true;
                if (_this.popupMountedListener) {
                    window.removeEventListener('message', _this.popupMountedListener);
                    delete _this.popupMountedListener;
                }
                _this.processPopupMountedQueue();
            }
        };
    };
    Popup.prototype.createPopupClosedListener = function (reject) {
        var _this = this;
        return window.setInterval(function () {
            if (!_this.popupWindow || _this.popupWindow.closed) {
                Popup.clearPopupIntervals();
                reject({ status: 'ABORTED', errors: [] });
            }
        }, 100);
    };
    Popup.prototype.createFinishedListener = function (resolve, reject) {
        var _this = this;
        return function (message) {
            if (Utils_1.default.messages().hasValidOrigin(message)
                && Utils_1.default.messages().isOfType(message, _this.finishedEventType)
                && Utils_1.default.messages().hasCorrectCorrelationID(message, _this.correlationID)) {
                // Finished handler will take cre of popup closing
                Popup.clearPopupIntervals();
                switch (message.data.result.status) {
                    case 'SUCCESS':
                        resolve(message.data && tslib_1.__assign({}, message.data.result));
                        break;
                    case 'ABORTED':
                        reject(message.data && tslib_1.__assign({}, message.data.result));
                        break;
                    case 'FAILED':
                        reject(message.data && tslib_1.__assign({}, message.data.result));
                        break;
                }
            }
        };
    };
    /**
     * Process onPopupMountedQueue when popup is mounted
     */
    Popup.prototype.processPopupMountedQueue = function () {
        if (this.isPopupMounted) {
            var callback = this.onPopupMountedQueue.shift();
            while (callback) {
                callback();
                callback = this.onPopupMountedQueue.shift();
            }
        }
    };
    Popup.popupIntervals = [];
    return Popup;
}());
exports.default = Popup;
//# sourceMappingURL=Popup.js.map