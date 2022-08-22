"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PopupWindow = /** @class */ (function () {
    function PopupWindow(url, target, features, useOverlay, replace) {
        this.id = "id-" + PopupWindow.uuidv4();
        this.useOverlay = typeof useOverlay !== 'undefined' ? useOverlay : true;
        this.win = window.open(url, target, features, replace);
        if (this.win) {
            this.setCloseInterval();
        }
        else {
            throw new Error('Something went wrong while trying to open the popup');
        }
        this.openOverlay();
    }
    PopupWindow.openNew = function (url, options) {
        var mergedOptions = Object.assign({
            title: 'Arkane Connect',
            w: 350,
            h: 685,
            useOverlay: true
        }, options);
        var left = (screen.width / 2) - (mergedOptions.w / 2);
        var top = (screen.height / 2) - (mergedOptions.h / 2);
        var features = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, ';
        features += "copyhistory=no, width=" + mergedOptions.w + ", height=" + mergedOptions.h + ", top=" + top + ", left=" + left;
        return new PopupWindow(url, mergedOptions.title, features, mergedOptions.useOverlay);
    };
    PopupWindow.prototype.setCloseInterval = function () {
        var _this = this;
        this.interval = window.setInterval(function () {
            if (!_this.win || _this.win.closed) {
                _this.clearCloseInterval();
                _this.close();
            }
        }, 100);
    };
    PopupWindow.prototype.clearCloseInterval = function () {
        window.clearInterval(this.interval);
    };
    PopupWindow.prototype.close = function () {
        if (this.win) {
            this.win.close();
            this.closeOverlay();
        }
    };
    Object.defineProperty(PopupWindow.prototype, "closed", {
        get: function () {
            if (this.win) {
                return this.win.closed;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    PopupWindow.prototype.focus = function () {
        if (this.win) {
            this.win.focus();
        }
    };
    PopupWindow.prototype.postMessage = function (message, targetOrigin, transfer) {
        if (this.win) {
            this.win.postMessage(message, targetOrigin, transfer);
        }
    };
    PopupWindow.prototype.closeOverlay = function () {
        if (this.useOverlay) {
            var overlay = document.querySelector("#" + this.id);
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }
    };
    PopupWindow.prototype.openOverlay = function () {
        var _this = this;
        if (this.useOverlay) {
            //remove existing overlay divs
            var overlayDiv = document.createElement('div');
            overlayDiv.id = this.id;
            overlayDiv.classList.add(PopupWindow.CONST.overlayClassName);
            overlayDiv.style.zIndex = '2147483647';
            overlayDiv.style.display = 'flex';
            overlayDiv.style.alignItems = 'center';
            overlayDiv.style.justifyContent = 'center';
            overlayDiv.style.textAlign = 'center';
            overlayDiv.style.position = 'fixed';
            overlayDiv.style.left = '0px';
            overlayDiv.style.right = '0px';
            overlayDiv.style.top = '0px';
            overlayDiv.style.bottom = '0px';
            overlayDiv.style.background = 'rgba(0,0,0,0.80)';
            overlayDiv.style.color = 'white';
            overlayDiv.style.border = '2px solid #f1f1f1';
            overlayDiv.innerHTML = "<div style=\"max-width: 350px;\">" +
                ("<div style=\"margin-bottom: 1rem\">" + PopupWindow.CONST.overlayMessage + "</div>") +
                ("<div><a style=\"" + PopupWindow.CONST.overlayLinkStyle + "\" href=\"javascript:void(0)\" class=\"" + PopupWindow.CONST.overlayLinkClassName + "\">" + PopupWindow.CONST.overlayLinkMessage + "</a></div>") +
                ("<a style=\"" + PopupWindow.CONST.overlayLinkStyle + " position: absolute; right: 1rem; top: 1rem;\" href=\"javascript:void(0)\" class=\"" + PopupWindow.CONST.overlayCloseLinkClassName + "\">X</a>") +
                "</div>";
            var existingOverlays = document.getElementsByClassName(PopupWindow.CONST.overlayClassName);
            for (var i = 0; i < existingOverlays.length; i++) {
                var existingOverlay = existingOverlays.item(i);
                if (existingOverlay) {
                    existingOverlay.remove();
                }
            }
            document.body.appendChild(overlayDiv);
            var link = overlayDiv.querySelector("#" + this.id + " ." + PopupWindow.CONST.overlayLinkClassName);
            var closeLink = overlayDiv.querySelector("#" + this.id + " ." + PopupWindow.CONST.overlayCloseLinkClassName);
            if (link) {
                link.addEventListener('click', function () {
                    _this.focus();
                });
            }
            if (closeLink) {
                closeLink.addEventListener('click', function () {
                    _this.close();
                });
            }
        }
    };
    PopupWindow.uuidv4 = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    PopupWindow.CONST = {
        overlayClassName: 'arkane-connect__overlay',
        overlayLinkClassName: 'arkane-connect__reopen-link',
        overlayCloseLinkClassName: 'arkane-connect__close-link',
        overlayMessage: 'Don’t see the popup? We’ll help you re-open the popup to complete your action.',
        overlayLinkMessage: 'Click to continue',
        overlayLinkStyle: 'color: white; text-decoration: underline; font-weight: bold;',
    };
    return PopupWindow;
}());
exports.PopupWindow = PopupWindow;
//# sourceMappingURL=PopupWindow.js.map