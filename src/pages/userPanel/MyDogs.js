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
const material_1 = require("@mui/material");
const useAuthContext_1 = require("../../hooks/useAuthContext");
const react_1 = __importStar(require("react"));
const EditNote_1 = __importDefault(require("@mui/icons-material/EditNote"));
const AppContext_1 = require("../../contexts/AppContext");
const Add_1 = __importDefault(require("@mui/icons-material/Add"));
const Edit_1 = __importDefault(require("@mui/icons-material/Edit"));
const CrossPassModal_1 = __importDefault(require("../../components/modals/CrossPassModal"));
const x_data_grid_1 = require("@mui/x-data-grid");
const MyDogs = () => {
    const { user } = (0, useAuthContext_1.useAuthContext)();
    const { dogs, setDogNoteEditingDog, crossPasses } = (0, react_1.useContext)(AppContext_1.AppContext);
    const [crossPassForDogId, setCrossPassForDogId] = (0, react_1.useState)();
    const [editingCrossPass, setEditingCrossPass] = (0, react_1.useState)();
    const [userDogs, setUserDogs] = (0, react_1.useState)((user === null || user === void 0 ? void 0 : user.dogs) || []);
    (0, react_1.useEffect)(() => {
        const userDogIds = user.dogs.flatMap(({ _id }) => _id);
        setUserDogs(dogs
            .filter(({ _id }) => userDogIds.includes(_id))
            .sort(({ name: aName }, { name: bName }) => {
            if (aName > bName)
                return 1;
            if (bName > aName)
                return -1;
            return 0;
        }));
    }, [user, dogs]);
    const getCrossPassesForDog = (0, react_1.useCallback)((givenDogId) => crossPasses.filter(({ dogId }) => dogId === givenDogId), [crossPasses]);
    if (!user)
        return null;
    return (react_1.default.createElement(material_1.Box, { sx: { display: "flex", flexDirection: "column", gap: 2 } },
        userDogs.map((dog) => (react_1.default.createElement(material_1.Card, { key: dog._id, sx: {
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: 1,
            } },
            react_1.default.createElement(material_1.Typography, { variant: "h6" }, dog.name),
            react_1.default.createElement(material_1.Box, { sx: {
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                } },
                react_1.default.createElement(material_1.Box, { sx: { display: "flex", flexDirection: "column" } },
                    react_1.default.createElement(material_1.Typography, { variant: "caption" }, "Notes:"),
                    react_1.default.createElement(material_1.Typography, null, dog.note || "Click button to add notes")),
                react_1.default.createElement(material_1.IconButton, { onClick: () => setDogNoteEditingDog(dog) },
                    react_1.default.createElement(EditNote_1.default, null))),
            react_1.default.createElement(material_1.Box, { sx: { display: "flex", flexDirection: "column", gap: 1 } },
                react_1.default.createElement(material_1.Typography, { variant: "caption" }, "Cross Passes"),
                react_1.default.createElement(x_data_grid_1.DataGrid, { rows: getCrossPassesForDog(dog._id), getRowId: (row) => row._id, columns: [
                        {
                            headerName: "Running on",
                            field: "runningOnLights",
                            flex: 1,
                            valueGetter: (_, { runningOnLights, runningOnDog }) => runningOnLights ? "Lights" : runningOnDog === null || runningOnDog === void 0 ? void 0 : runningOnDog.name,
                        },
                        {
                            headerName: "Starting position",
                            field: "startingPosition",
                            flex: 1,
                        },
                        {
                            headerName: "Notes",
                            field: "note",
                            flex: 1,
                        },
                        {
                            headerName: "Actions",
                            field: "actions",
                            sortable: false,
                            renderCell: ({ row }) => (react_1.default.createElement(material_1.IconButton, { onClick: () => {
                                    setEditingCrossPass(row);
                                    setCrossPassForDogId(dog._id);
                                } },
                                react_1.default.createElement(Edit_1.default, null))),
                        },
                    ], disableRowSelectionOnClick: true, hideFooter: true, disableColumnMenu: true }),
                react_1.default.createElement(material_1.IconButton, { onClick: () => setCrossPassForDogId(dog._id), sx: { alignSelf: "flex-end" } },
                    react_1.default.createElement(Add_1.default, null)))))),
        react_1.default.createElement(CrossPassModal_1.default, { dogId: crossPassForDogId, onClose: () => setCrossPassForDogId(undefined), open: !!crossPassForDogId, crossPass: editingCrossPass })));
};
exports.default = MyDogs;
