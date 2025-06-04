"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const useSocketContext_1 = require("../../hooks/useSocketContext");
const react_hook_form_1 = require("react-hook-form");
const FormModal_jsx_1 = __importDefault(require("./../FormModal.jsx"));
const FormGrid_jsx_1 = __importDefault(require("./../FormGrid.jsx"));
const FormTextField_jsx_1 = __importDefault(require("./../inputs/FormTextField.jsx"));
const useAuthContext_1 = require("../../hooks/useAuthContext");
const AppContext_1 = require("../../contexts/AppContext");
const NoteModal = () => {
    var _a;
    const { user } = (0, useAuthContext_1.useAuthContext)();
    const { settings, dogNoteEditingDog, setDogNoteEditingDog } = (0, react_1.useContext)(AppContext_1.AppContext);
    const { socket } = (0, useSocketContext_1.useSocketContext)();
    const formMethods = (0, react_hook_form_1.useForm)({
        defaultValues: { note: (dogNoteEditingDog === null || dogNoteEditingDog === void 0 ? void 0 : dogNoteEditingDog.note) || "" },
    });
    (0, react_1.useEffect)(() => {
        formMethods.reset({ note: (dogNoteEditingDog === null || dogNoteEditingDog === void 0 ? void 0 : dogNoteEditingDog.note) || "" });
    }, [dogNoteEditingDog, formMethods]);
    const { handleSubmit, reset } = (0, react_1.useMemo)(() => formMethods, [formMethods]);
    (0, react_1.useEffect)(() => {
        if (!dogNoteEditingDog)
            return;
        reset({ note: dogNoteEditingDog.note || "" });
    }, [dogNoteEditingDog, reset]);
    const onClose = () => __awaiter(void 0, void 0, void 0, function* () {
        yield socket.emit("update_settings", { userUpdatingNotes: null });
        setDogNoteEditingDog(undefined);
    });
    const onSubmit = (_a) => __awaiter(void 0, [_a], void 0, function* ({ note }) {
        if (!dogNoteEditingDog)
            return;
        yield socket.emit("update_dog", { _id: dogNoteEditingDog._id, note: note || "" }, () => onClose());
        // TODO: error handling eventually?
    });
    // Disabling this feature for now
    const onEditingStart = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!dogNoteEditingDog)
            return;
        yield socket.emit("update_settings", { userUpdatingNotes: user._id });
    });
    const onEditingStop = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!dogNoteEditingDog)
            return;
        yield socket.emit("update_settings", { userUpdatingNotes: null });
    });
    const isAnotherUserEditing = (0, react_1.useMemo)(() => (settings === null || settings === void 0 ? void 0 : settings.userUpdatingNotes) && user._id !== (settings === null || settings === void 0 ? void 0 : settings.userUpdatingNotes), [settings, user]);
    return (react_1.default.createElement(react_hook_form_1.FormProvider, Object.assign({}, formMethods),
        react_1.default.createElement(FormModal_jsx_1.default, { open: !!dogNoteEditingDog, onClose: onClose, title: `${(_a = dogNoteEditingDog === null || dogNoteEditingDog === void 0 ? void 0 : dogNoteEditingDog.name) !== null && _a !== void 0 ? _a : "Dog"}'s notes` },
            react_1.default.createElement(FormGrid_jsx_1.default, null,
                react_1.default.createElement(FormTextField_jsx_1.default, { name: "note", label: "Notes", rows: 5, 
                    // Disabling this feature for now
                    onFocus: onEditingStart, onBlur: onEditingStop, disabled: isAnotherUserEditing, helperText: isAnotherUserEditing ? "Another user updating notes" : undefined }),
                react_1.default.createElement(material_1.DialogActions, { sx: { padding: 0 } },
                    react_1.default.createElement(material_1.Button, { size: "medium", variant: "outlined", onClick: onClose }, "Cancel"),
                    react_1.default.createElement(material_1.Button, { size: "medium", variant: "contained", onClick: handleSubmit(onSubmit) }, "Save notes"))))));
};
exports.default = NoteModal;
