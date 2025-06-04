"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.Errors = exports.Messages = void 0;
var Messages;
(function (Messages) {
    Messages["EVENT_TEMPLATE_FORM_ERROR"] = "event_template_form_error";
})(Messages || (exports.Messages = Messages = {}));
var Errors;
(function (Errors) {
    Errors["TEMPLATE_WITH_NAME_ALREADY_EXISTS"] = "Template with given name already exists";
})(Errors || (exports.Errors = Errors = {}));
const receivedIsOneOfErrors = (received) => !!Errors[received];
const handleError = (onErrorHandler, onSuccessHandler) => (received) => {
    if (received && receivedIsOneOfErrors(received)) {
        onErrorHandler(Errors[received]);
        return;
    }
    onSuccessHandler === null || onSuccessHandler === void 0 ? void 0 : onSuccessHandler();
};
exports.handleError = handleError;
