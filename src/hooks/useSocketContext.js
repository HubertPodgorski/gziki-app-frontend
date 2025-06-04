"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSocketContext = void 0;
const react_1 = require("react");
const SocketContext_1 = require("../contexts/SocketContext");
const useSocketContext = () => {
    const context = (0, react_1.useContext)(SocketContext_1.SocketContext);
    return context;
};
exports.useSocketContext = useSocketContext;
