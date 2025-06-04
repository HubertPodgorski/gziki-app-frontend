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
const react_hook_form_1 = require("react-hook-form");
const FormModal_1 = __importDefault(require("../../components/FormModal"));
const FormGrid_1 = __importDefault(require("../../components/FormGrid"));
const FormSelect_1 = __importDefault(require("../../components/inputs/FormSelect"));
const AppContext_1 = require("../../contexts/AppContext");
const FormTextSelect_1 = __importDefault(require("../../components/inputs/FormTextSelect"));
const useSocketContext_1 = require("../../hooks/useSocketContext");
const mapToFormType = ({ description, dogs, position, }) => ({
    description,
    dogs: dogs.map(({ _id }) => _id),
    position,
});
const TaskForm = ({ open, onClose, initialData, editingId, maxRowIndex, }) => {
    const { dogs, dogTasks } = (0, react_1.useContext)(AppContext_1.AppContext);
    const { socket } = (0, useSocketContext_1.useSocketContext)();
    const formMethods = (0, react_hook_form_1.useForm)({
        defaultValues: mapToFormType(initialData),
    });
    const { handleSubmit, reset } = (0, react_1.useMemo)(() => formMethods, [formMethods]);
    (0, react_1.useEffect)(() => {
        reset(mapToFormType(initialData));
    }, [initialData, reset]);
    const getPosition = (values) => {
        if (editingId) {
            return Object.assign(Object.assign({}, values.position), { rowIndex: values.position.rowIndex });
        }
        if (maxRowIndex) {
            return Object.assign(Object.assign({}, values.position), { rowIndex: maxRowIndex });
        }
        return values.position;
    };
    const onSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        // TODO: map selected dogs to dogs
        // TODO: extract me to external method - used twice already
        const selectedDogs = values.dogs
            .map((dogId) => {
            const dog = dogs.find(({ _id }) => _id === dogId);
            if (!dog)
                return undefined;
            return dog;
        })
            .filter((dog) => !!dog);
        const data = {
            description: values.description,
            dogs: selectedDogs,
            position: getPosition(values),
        };
        if (editingId) {
            socket.emit("update_task", Object.assign(Object.assign({}, data), { _id: editingId }), () => {
                onClose();
            });
        }
        else {
            socket.emit("add_task", data, () => {
                onClose();
            });
        }
        // TODO: error handling eventually?
    });
    const dogTaskOptions = (0, react_1.useMemo)(() => dogTasks.map(({ name }) => ({ value: name, label: name })), [dogTasks]);
    return (react_1.default.createElement(react_hook_form_1.FormProvider, Object.assign({}, formMethods),
        react_1.default.createElement(FormModal_1.default, { onClose: onClose, open: open, title: "Task" },
            react_1.default.createElement(FormGrid_1.default, null,
                react_1.default.createElement(FormTextSelect_1.default, { label: "Type or select task description", options: dogTaskOptions, name: "description" }),
                react_1.default.createElement(FormSelect_1.default, { name: "dogs", label: "Dogs", options: dogs.map(({ name, _id }) => ({ value: _id, label: name })) }),
                react_1.default.createElement(material_1.DialogActions, { sx: { padding: 0 } },
                    react_1.default.createElement(material_1.Button, { size: "medium", variant: "outlined", onClick: onClose }, "Cancel"),
                    react_1.default.createElement(material_1.Button, { size: "medium", variant: "contained", onClick: handleSubmit(onSubmit) }, "Submit"))))));
};
exports.default = TaskForm;
