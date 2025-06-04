"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const useFormHelpers_1 = require("../hooks/useFormHelpers");
const TaskForm_1 = __importDefault(require("../pages/forms/TaskForm"));
const AddTaskHereButton = ({ columnIndex, rowIndex, positionIndex }) => {
    const { editingId: taskEditingId, formOpen: taskFormOpen, setFormOpen: setTaskFormOpen, handleFormClose: handleTaskFormClose, formInitialData: taskFormInitialData, } = (0, useFormHelpers_1.useFormHelpers)({
        description: "",
        dogs: [],
        position: { columnIndex, rowIndex, positionIndex },
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { sx: {
                padding: 1,
                background: "#333",
                borderRadius: "6px",
                alignSelf: "flex-end",
                cursor: "pointer",
            }, onClick: () => setTaskFormOpen(true) }, "Add task here"),
        react_1.default.createElement(TaskForm_1.default, { open: taskFormOpen, onClose: handleTaskFormClose, initialData: taskFormInitialData, editingId: taskEditingId })));
};
exports.default = AddTaskHereButton;
