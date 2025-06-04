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
const ChipsGrid_1 = __importDefault(require("./ChipsGrid"));
const TaskCell_1 = __importDefault(require("./tasksGrid/TaskCell"));
const useAuthContext_1 = require("../hooks/useAuthContext");
const tasks_1 = require("../helpers/tasks");
const useIsMobile_1 = require("../hooks/useIsMobile");
const AppContext_1 = require("../contexts/AppContext");
const DogsTaskCell = ({ item: { _id, dogs, description }, index }) => {
    const isMobile = (0, useIsMobile_1.useIsMobile)();
    const { user } = (0, useAuthContext_1.useAuthContext)();
    const { setDogNoteEditingDog } = (0, react_1.useContext)(AppContext_1.AppContext);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TaskCell_1.default, { index: index, id: _id, key: _id },
            react_1.default.createElement(material_1.Typography, { variant: isMobile ? "body2" : "h5" }, description),
            dogs.length > 0 && (react_1.default.createElement(ChipsGrid_1.default, { dense: true }, dogs.map((dog) => {
                const { name, _id } = dog;
                return (react_1.default.createElement(material_1.Chip, { label: `${name}`, key: _id, color: (0, tasks_1.isMyDog)(_id, user.dogs) ? "success" : "default", onClick: () => setDogNoteEditingDog(dog) }));
            }))),
            dogs.length === 0 && react_1.default.createElement(material_1.Typography, null, "No dogs selected"))));
};
exports.default = DogsTaskCell;
