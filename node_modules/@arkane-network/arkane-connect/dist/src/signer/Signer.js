"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PopupSigner_1 = require("./PopupSigner");
var RedirectSigner_1 = require("./RedirectSigner");
var WindowMode_1 = require("../models/WindowMode");
var SignerFactory = /** @class */ (function () {
    function SignerFactory() {
    }
    SignerFactory.createSignerFor = function (signMethod, bearerTokenProvider, popupOptions) {
        switch (signMethod) {
            case WindowMode_1.WindowMode.POPUP:
                return new PopupSigner_1.PopupSigner(bearerTokenProvider, popupOptions);
            case WindowMode_1.WindowMode.REDIRECT:
                return new RedirectSigner_1.RedirectSigner(bearerTokenProvider);
            default:
                throw new Error('The provided signMethod is not supported');
        }
    };
    return SignerFactory;
}());
exports.SignerFactory = SignerFactory;
/* Deprecated, use WindowMode */
var SignMethod;
(function (SignMethod) {
    SignMethod["POPUP"] = "POPUP";
    SignMethod["REDIRECT"] = "REDIRECT";
})(SignMethod = exports.SignMethod || (exports.SignMethod = {}));
//# sourceMappingURL=Signer.js.map