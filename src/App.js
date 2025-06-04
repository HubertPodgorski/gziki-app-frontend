"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const material_1 = require("@mui/material");
const AppContext_1 = require("./contexts/AppContext");
const Router_1 = __importDefault(require("./Router"));
const theme_1 = __importDefault(require("./helpers/theme"));
const SocketHandler_1 = __importDefault(require("./components/SocketHandler"));
const AuthContext_1 = require("./contexts/AuthContext");
const BottomNavBar_1 = __importDefault(require("./components/BottomNavBar"));
const material_ui_confirm_1 = require("material-ui-confirm");
const notistack_1 = require("notistack");
const SocketContext_jsx_1 = require("./contexts/SocketContext.jsx");
const AdapterDateFnsV3_1 = require("@mui/x-date-pickers/AdapterDateFnsV3");
const x_date_pickers_1 = require("@mui/x-date-pickers");
const pl_1 = require("date-fns/locale/pl");
const NoteModal_1 = __importDefault(require("./components/modals/NoteModal"));
const App = () => (react_1.default.createElement(material_1.ThemeProvider, { theme: theme_1.default },
    react_1.default.createElement(notistack_1.SnackbarProvider, { maxSnack: 3 },
        react_1.default.createElement(material_ui_confirm_1.ConfirmProvider, null,
            react_1.default.createElement(AuthContext_1.AuthContextProvider, null,
                react_1.default.createElement(SocketContext_jsx_1.SocketContextProvider, null,
                    react_1.default.createElement(x_date_pickers_1.LocalizationProvider, { dateAdapter: AdapterDateFnsV3_1.AdapterDateFns, adapterLocale: pl_1.pl },
                        react_1.default.createElement(AppContext_1.AppContextProvider, null,
                            react_1.default.createElement(SocketHandler_1.default, null),
                            react_1.default.createElement(material_1.CssBaseline, null),
                            react_1.default.createElement(NoteModal_1.default, null),
                            react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                                react_1.default.createElement(material_1.Box, { sx: {
                                        padding: theme_1.default.spacing(2, 2, 9, 2),
                                        [theme_1.default.breakpoints.down("md")]: {
                                            gridGap: theme_1.default.spacing(1),
                                            padding: theme_1.default.spacing(1, 1, 9, 1),
                                        },
                                    } },
                                    react_1.default.createElement(Router_1.default, null),
                                    react_1.default.createElement(BottomNavBar_1.default, null)))))))))));
exports.default = App;
