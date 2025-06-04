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
const react_router_dom_1 = require("react-router-dom");
const routesAndPaths_1 = require("./helpers/routesAndPaths");
const UserPanel_1 = __importDefault(require("./pages/userPanel/UserPanel"));
const AdminPanel_1 = __importDefault(require("./pages/adminPanel/AdminPanel"));
const Tasks_1 = __importDefault(require("./pages/userPanel/Tasks"));
const Tasks_2 = __importDefault(require("./pages/adminPanel/Tasks"));
const Calendar_1 = __importDefault(require("./pages/userPanel/Calendar"));
const Users_1 = __importDefault(require("./pages/adminPanel/Users"));
const Dogs_1 = __importDefault(require("./pages/adminPanel/Dogs"));
const Events_1 = __importDefault(require("./pages/adminPanel/Events"));
const LoginForm_1 = __importDefault(require("./pages/forms/LoginForm"));
const SignupForm_1 = __importDefault(require("./pages/forms/SignupForm"));
const useAuthContext_1 = require("./hooks/useAuthContext");
const useIsAdmin_1 = require("./hooks/useIsAdmin");
const DogTasks_1 = __importDefault(require("./pages/adminPanel/DogTasks"));
const EventTemplates_1 = __importDefault(require("./pages/adminPanel/EventTemplates"));
const MyDogs_1 = __importDefault(require("./pages/userPanel/MyDogs"));
const Router = () => {
    const { user } = (0, useAuthContext_1.useAuthContext)();
    const isAdmin = (0, useIsAdmin_1.useIsAdmin)();
    const location = (0, react_router_dom_1.useLocation)();
    (0, react_1.useEffect)(() => {
        localStorage.setItem("initial-location", JSON.stringify(location));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (react_1.default.createElement(react_router_dom_1.Routes, null,
        !!user && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: routesAndPaths_1.userPaths.root, element: react_1.default.createElement(UserPanel_1.default, null) },
                react_1.default.createElement(react_router_dom_1.Route, { index: true, element: react_1.default.createElement(react_router_dom_1.Navigate, { to: routesAndPaths_1.userRoutes.tasks }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: routesAndPaths_1.userPaths.tasks, element: react_1.default.createElement(Tasks_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: routesAndPaths_1.userPaths.calendar, element: react_1.default.createElement(Calendar_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: routesAndPaths_1.userPaths.myDogs, element: react_1.default.createElement(MyDogs_1.default, null) })),
            isAdmin && (react_1.default.createElement(react_router_dom_1.Route, { path: routesAndPaths_1.adminPaths.root, element: react_1.default.createElement(AdminPanel_1.default, null) },
                react_1.default.createElement(react_router_dom_1.Route, { index: true, element: react_1.default.createElement(react_router_dom_1.Navigate, { to: routesAndPaths_1.adminRoutes.tasks }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: routesAndPaths_1.adminPaths.tasks, element: react_1.default.createElement(Tasks_2.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: routesAndPaths_1.adminPaths.users, element: react_1.default.createElement(Users_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: routesAndPaths_1.adminPaths.dogTasks, element: react_1.default.createElement(DogTasks_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: routesAndPaths_1.adminPaths.dogs, element: react_1.default.createElement(Dogs_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: routesAndPaths_1.adminPaths.events, element: react_1.default.createElement(Events_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: routesAndPaths_1.adminPaths.eventTemplates, element: react_1.default.createElement(EventTemplates_1.default, null) }))))),
        react_1.default.createElement(react_router_dom_1.Route, { index: true, element: react_1.default.createElement(react_router_dom_1.Navigate, { to: routesAndPaths_1.userRoutes.tasks }) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_1.default.createElement(LoginForm_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/signup", element: react_1.default.createElement(SignupForm_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(react_router_dom_1.Navigate, { to: routesAndPaths_1.notAuthenticatedRoutes.login }) })));
};
exports.default = Router;
