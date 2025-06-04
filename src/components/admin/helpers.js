"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewTaskPosition = void 0;
const getNewTaskPosition = (tasks) => {
    if (!tasks.length)
        return 0;
    return tasks.reduce((currentPosition, task) => {
        const { position: { positionIndex }, } = task;
        return currentPosition <= positionIndex
            ? positionIndex + 1
            : currentPosition;
    }, 0);
};
exports.getNewTaskPosition = getNewTaskPosition;
