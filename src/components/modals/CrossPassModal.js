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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const useSocketContext_1 = require("../../hooks/useSocketContext");
const react_hook_form_1 = require("react-hook-form");
const FormModal_jsx_1 = __importDefault(require("../FormModal.jsx"));
const FormGrid_jsx_1 = __importDefault(require("../FormGrid.jsx"));
const AppContext_1 = require("../../contexts/AppContext");
const FormSwitch_1 = __importDefault(require("../inputs/FormSwitch"));
const FormSelect_1 = __importDefault(require("../inputs/FormSelect"));
const FormTextSelect_1 = __importDefault(require("../inputs/FormTextSelect"));
const getSubmitData = ({ runningOnLights, runningOnDogId, note, startingPosition }, dogs, dogId) => {
    if (runningOnLights) {
        return {
            runningOnLights,
            note,
            startingPosition,
            runningOnDog: null,
            dogId,
        };
    }
    const dog = dogs.find(({ _id }) => _id === runningOnDogId);
    return {
        runningOnLights,
        note,
        startingPosition,
        runningOnDog: dog,
        dogId,
    };
};
const startingPositionOptions = new Array(20).fill("").map((value, index) => ({
    value: `${index + 1}m`,
    label: `${index + 1}m`,
}));
const initialData = {
    note: "",
    runningOnDogId: "",
    runningOnLights: false,
    startingPosition: "",
};
const CrossPassModal = ({ crossPass, dogId, onClose: handleClose, open, }) => {
    const { dogs } = (0, react_1.useContext)(AppContext_1.AppContext);
    const { socket } = (0, useSocketContext_1.useSocketContext)();
    const formMethods = (0, react_hook_form_1.useForm)({
        defaultValues: initialData,
    });
    const { handleSubmit, reset } = (0, react_1.useMemo)(() => formMethods, [formMethods]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (!crossPass)
            return;
        reset({
            note: (crossPass === null || crossPass === void 0 ? void 0 : crossPass.note) || "",
            runningOnDogId: ((_a = crossPass === null || crossPass === void 0 ? void 0 : crossPass.runningOnDog) === null || _a === void 0 ? void 0 : _a._id) || "",
            runningOnLights: (crossPass === null || crossPass === void 0 ? void 0 : crossPass.runningOnLights) || false,
            startingPosition: (crossPass === null || crossPass === void 0 ? void 0 : crossPass.startingPosition) || "",
        });
    }, [crossPass, reset, dogId]);
    const isEdit = (0, react_1.useMemo)(() => !!(crossPass === null || crossPass === void 0 ? void 0 : crossPass._id), [crossPass]);
    const onClose = () => {
        reset(initialData);
        handleClose();
    };
    const onSubmit = (formData) => {
        if (isEdit) {
            socket.emit("update_cross_pass", Object.assign({ _id: crossPass._id }, getSubmitData(formData, dogs, dogId)), () => onClose());
        }
        else {
            socket.emit("create_cross_pass", getSubmitData(formData, dogs, dogId), () => onClose());
        }
    };
    const runningOnLights = formMethods.watch("runningOnLights");
    return (react_1.default.createElement(react_hook_form_1.FormProvider, Object.assign({}, formMethods),
        react_1.default.createElement(FormModal_jsx_1.default, { open: open, onClose: onClose, title: `${isEdit ? "Edit" : "Create"} cross pass` },
            react_1.default.createElement(FormGrid_jsx_1.default, null,
                react_1.default.createElement(FormSwitch_1.default, { name: "runningOnLights", label: "Running on lights" }),
                !runningOnLights && (react_1.default.createElement(FormSelect_1.default, { options: dogs.map(({ _id, name }) => ({
                        value: _id,
                        label: name,
                    })), multi: false, name: "runningOnDogId", label: "Running on dog" })),
                react_1.default.createElement(FormTextSelect_1.default, { name: "startingPosition", label: "Starting position", options: startingPositionOptions }),
                react_1.default.createElement(FormTextSelect_1.default, { name: "note", label: "Note", options: [] }),
                react_1.default.createElement(material_1.DialogActions, { sx: { padding: 0 } },
                    react_1.default.createElement(material_1.Button, { size: "medium", variant: "outlined", onClick: onClose }, "Cancel"),
                    react_1.default.createElement(material_1.Button, { size: "medium", variant: "contained", onClick: handleSubmit(onSubmit) }, "Save"))))));
};
exports.default = CrossPassModal;
