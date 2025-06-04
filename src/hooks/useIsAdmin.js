"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsAdmin = void 0;
const react_1 = require("react");
const useAuthContext_1 = require("./useAuthContext");
const types_1 = require("../helpers/types");
const useIsAdmin = () => {
    const { user } = (0, useAuthContext_1.useAuthContext)();
    return (0, react_1.useMemo)(() => user &&
        user.roles &&
        user.roles.length > 0 &&
        user.roles.includes(types_1.Roles.ADMIN), [user]);
};
exports.useIsAdmin = useIsAdmin;
