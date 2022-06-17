"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateUserDto = exports.validateCreateUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateCreateUserSchema = {
    email: joi_1.default.string()
        .min(10)
        .max(30)
        .required(),
    password: joi_1.default.string()
        .min(6)
        .max(20)
        .required()
};
exports.validateCreateUserDto = joi_1.default.object(exports.validateCreateUserSchema);
