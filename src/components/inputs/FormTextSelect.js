"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const material_1 = require("@mui/material");
const FormTextSelect = ({ options, name, label }) => {
    const { control } = (0, react_hook_form_1.useFormContext)();
    return (react_1.default.createElement(react_hook_form_1.Controller, { control: control, name: name, render: ({ field: { onChange, value } }) => (react_1.default.createElement(material_1.Autocomplete, { onChange: (e, value) => onChange(value), value: value, freeSolo: true, options: options.map(({ value }) => value), renderInput: (params) => (react_1.default.createElement(material_1.TextField, Object.assign({}, params, { onChange: onChange, label: label }))) })) }));
};
exports.default = FormTextSelect;
