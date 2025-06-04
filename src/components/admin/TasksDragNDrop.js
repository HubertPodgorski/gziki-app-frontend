"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TasksMainGrid_1 = __importDefault(require("../tasksGrid/TasksMainGrid"));
const TasksRow_1 = __importDefault(require("../tasksGrid/TasksRow"));
const TasksColumn_1 = __importDefault(require("../tasksGrid/TasksColumn"));
const material_1 = require("@mui/material");
const TaskCell_1 = __importDefault(require("../tasksGrid/TaskCell"));
const ChipsGrid_1 = __importDefault(require("../ChipsGrid"));
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const useIsMobile_1 = require("../../hooks/useIsMobile");
const useMoveTasksRow_1 = require("../../hooks/useMoveTasksRow");
const useMoveTasksCell_1 = require("../../hooks/useMoveTasksCell");
const AddTaskHereButton_1 = __importDefault(require("../../components/AddTaskHereButton"));
const helpers_1 = require("./helpers");
const useSocketContext_1 = require("../../hooks/useSocketContext");
const TasksDragNDrop = ({ handleTaskEditClick, mappedTasks, setMappedTasks, }) => {
    const { socket } = (0, useSocketContext_1.useSocketContext)();
    const moveTasksRow = (0, useMoveTasksRow_1.useMoveTasksRow)();
    const moveTasksCell = (0, useMoveTasksCell_1.useMoveTasksCell)();
    const isMobile = (0, useIsMobile_1.useIsMobile)();
    const onDelete = (taskId) => {
        socket.emit("delete_task", { _id: taskId });
    };
    const onDragEnd = (result) => __awaiter(void 0, void 0, void 0, function* () {
        if (result.type === "row") {
            moveTasksRow(result, mappedTasks, setMappedTasks);
            return;
        }
        moveTasksCell(result, mappedTasks);
    });
    const onEditClick = (_a) => __awaiter(void 0, [_a], void 0, function* ({ position, description, dogs, _id }) {
        yield handleTaskEditClick({
            position,
            description,
            dogs,
        }, _id);
    });
    return (react_1.default.createElement(react_beautiful_dnd_1.DragDropContext, { onDragEnd: onDragEnd },
        react_1.default.createElement(TasksMainGrid_1.default, { adminPanel: true }, Object.entries(mappedTasks).map(([rowIndex, columns], index) => (react_1.default.createElement(TasksRow_1.default, { key: `${rowIndex}_${index}`, rowIndex: rowIndex, adminPanel: true, index: index }, Object.entries(columns).map(([columnIndex, items]) => (react_1.default.createElement(TasksColumn_1.default, { rowIndex: rowIndex, columnIndex: columnIndex, key: columnIndex, adminPanel: true },
            !!items.length &&
                items.map((item, index) => (react_1.default.createElement(TaskCell_1.default, { index: index, adminPanel: true, id: item._id, key: item._id, onClick: () => {
                        onEditClick(item);
                    } },
                    react_1.default.createElement(material_1.Typography, { variant: isMobile ? "body2" : "h5" }, item.description),
                    item.dogs.length > 0 && (react_1.default.createElement(ChipsGrid_1.default, null, item.dogs.map(({ name, _id }) => (react_1.default.createElement(material_1.Chip, { label: name, key: _id }))))),
                    item.dogs.length === 0 && (react_1.default.createElement(material_1.Typography, null, "No dogs selected")),
                    react_1.default.createElement(material_1.IconButton, { sx: { position: "absolute", top: 2, right: 2 }, color: "error", onClick: (e) => {
                            e.stopPropagation();
                            onDelete(item._id);
                        } },
                        react_1.default.createElement(Delete_1.default, null))))),
            react_1.default.createElement(AddTaskHereButton_1.default, { columnIndex: +columnIndex, rowIndex: +rowIndex, positionIndex: (0, helpers_1.getNewTaskPosition)(items) }))))))))));
};
exports.default = TasksDragNDrop;
