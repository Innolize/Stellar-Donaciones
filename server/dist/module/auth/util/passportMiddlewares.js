"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuthentication = exports.localAuthentication = void 0;
const passport_1 = __importDefault(require("passport"));
exports.localAuthentication = passport_1.default.authenticate('local', { session: false });
exports.jwtAuthentication = passport_1.default.authenticate('jwt', { session: false });
