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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContextProvider = exports.AppContext = void 0;
const react_1 = __importStar(require("react"));
exports.AppContext = (0, react_1.createContext)({
    tasks: [],
    dogs: [],
    events: [],
    users: [],
    dogTasks: [],
    eventTemplates: [],
    crossPasses: [],
});
// TODO: start using reducers and actions
const AppContextProvider = ({ children }) => {
    const [tasks, setTasks] = (0, react_1.useState)([]);
    const [dogs, setDogs] = (0, react_1.useState)([]);
    const [events, setEvents] = (0, react_1.useState)([]);
    const [users, setUsers] = (0, react_1.useState)([]);
    const [dogTasks, setDogTasks] = (0, react_1.useState)([]);
    const [eventTemplates, setEventTemplates] = (0, react_1.useState)([]);
    const [subscriptionDetails, setSubscriptionDetails] = (0, react_1.useState)();
    const [settings, setSettings] = (0, react_1.useState)();
    const [dogNoteEditingDog, setDogNoteEditingDog] = (0, react_1.useState)();
    const [crossPasses, setCrossPasses] = (0, react_1.useState)([]);
    return (react_1.default.createElement(exports.AppContext.Provider, { value: {
            tasks,
            setTasks,
            dogs,
            setDogs,
            events,
            setEvents,
            users,
            setUsers,
            dogTasks,
            setDogTasks,
            eventTemplates,
            setEventTemplates,
            subscriptionDetails,
            setSubscriptionDetails,
            settings,
            setSettings,
            dogNoteEditingDog,
            setDogNoteEditingDog,
            crossPasses,
            setCrossPasses,
        } }, children));
};
exports.AppContextProvider = AppContextProvider;
