"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const pl_1 = require("date-fns/locale/pl");
const date_fns_1 = require("date-fns");
const formatDate = (date, dateFormat) => (0, date_fns_1.format)(date, dateFormat, { locale: pl_1.pl });
exports.formatDate = formatDate;
