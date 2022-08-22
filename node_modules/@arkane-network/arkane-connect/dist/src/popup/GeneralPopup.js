"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var EventTypes_1 = require("../types/EventTypes");
var Popup_1 = tslib_1.__importDefault(require("./Popup"));
var Utils_1 = tslib_1.__importDefault(require("../utils/Utils"));
var GeneralPopup = /** @class */ (function (_super) {
    tslib_1.__extends(GeneralPopup, _super);
    function GeneralPopup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.finishedEventType = EventTypes_1.EventTypes.POPUP_FINISHED;
        _this.sendDataEventType = EventTypes_1.EventTypes.SEND_DATA;
        return _this;
    }
    GeneralPopup.openNewPopup = function (action, bearerTokenProvider, data, options) {
        var popup = new GeneralPopup(Utils_1.default.urls.connect + "/popup/general/init.html", bearerTokenProvider, options);
        window.addEventListener('beforeunload', function () {
            popup.close();
        });
        popup.focus();
        return popup.sendData(action, data && JSON.parse(JSON.stringify(data))).finally(function () {
            popup.close();
        });
    };
    GeneralPopup.prototype.sendData = function (action, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onPopupMountedQueue.push(_this.attachFinishedListener(resolve, reject));
            _this.onPopupMountedQueue.push(_this.sendDataToPopup(action, data));
            _this.processPopupMountedQueue();
        });
    };
    GeneralPopup.prototype.sendDataToPopup = function (action, data) {
        var _this = this;
        return function () {
            if (_this.isOpen()) {
                var params = { action: action, bearerToken: _this.bearerTokenProvider() };
                if (data) {
                    params.data = data;
                }
                _this.popupWindow.postMessage({ type: _this.sendDataEventType, params: params }, Utils_1.default.urls.connect);
            }
        };
    };
    return GeneralPopup;
}(Popup_1.default));
exports.GeneralPopup = GeneralPopup;
//# sourceMappingURL=GeneralPopup.js.map