"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const inversify_types_1 = require("../../config/inversify.types");
const init = (app, container) => {
    const controller = container.get(inversify_types_1.TYPES.Auth.Controller);
    controller.configureRoutes(app);
};
exports.init = init;
