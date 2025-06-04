"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_hook_form_1 = require("react-hook-form");
const react_1 = __importDefault(require("react"));
const FormRadioGroup = ({ name, label }) => {
    const { control } = (0, react_hook_form_1.useFormContext)();
    return (react_1.default.createElement(react_hook_form_1.Controller, { control: control, name: name, render: ({ field }) => (react_1.default.createElement(material_1.Box, { sx: { display: "flex", alignItems: "center" } },
            react_1.default.createElement(material_1.Switch, { onClick: () => field.onChange(!field.value), checked: !!field.value }),
            react_1.default.createElement(material_1.Typography, null, label))) }));
};
exports.default = FormRadioGroup;
