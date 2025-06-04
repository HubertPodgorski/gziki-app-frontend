"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventTypeOptions = exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType["TRAINING"] = "TRAINING";
    EventType["COMPETITION"] = "COMPETITION";
    EventType["SEMINARY"] = "SEMINARY";
    EventType["MEETING"] = "MEETING";
})(EventType || (exports.EventType = EventType = {}));
const eventTypes = [
    EventType.TRAINING,
    EventType.COMPETITION,
    EventType.SEMINARY,
    EventType.MEETING,
];
const getEventTypeLabelByType = (eventType) => {
    switch (eventType) {
        case EventType.COMPETITION:
            return "Competition";
        case EventType.SEMINARY:
            return "Seminary";
        case EventType.TRAINING:
            return "Training";
        case EventType.MEETING:
            return "Meeting";
        default:
            return "";
    }
};
exports.eventTypeOptions = eventTypes.map((type) => ({
    value: type,
    label: getEventTypeLabelByType(type),
}));
