"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassportStrategies = void 0;
const inversify_types_1 = require("../../../config/inversify.types");
const JwtStrategy_1 = require("./JwtStrategy");
const LocalStrategy_1 = require("./LocalStrategy");
const configurePassportStrategies = (container, passport) => {
    const userRepository = container.get(inversify_types_1.TYPES.User.Repository);
    (0, JwtStrategy_1.configureJwtStrategy)(userRepository, passport);
    (0, LocalStrategy_1.configureLocalStrategy)(userRepository, passport);
};
exports.configurePassportStrategies = configurePassportStrategies;
