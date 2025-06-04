"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const DialogContentStyled = (0, material_1.styled)(material_1.DialogContent)(({ theme }) => ({
    minWidth: 400,
    maxWidth: 600,
    [theme.breakpoints.down("md")]: {
        minWidth: 300,
        padding: theme.spacing(1),
    },
}));
const Modal = ({ open, onClose, children, title }) => {
    const theme = (0, material_1.useTheme)();
    return (react_1.default.createElement(material_1.Dialog, { open: open, onClose: onClose, sx: {
            [theme.breakpoints.down("md")]: {
                ".MuiDialog-paper": {
                    margin: theme.spacing(1),
                    width: "100%",
                },
            },
        } },
        react_1.default.createElement(material_1.DialogTitle, null, title),
        react_1.default.createElement(DialogContentStyled, null, children)));
};
exports.default = Modal;
