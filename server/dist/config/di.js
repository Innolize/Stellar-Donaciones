"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configUserModel = void 0;
const sequelize_1 = require("sequelize");
const module_1 = require("../module/user/module");
const bcrypt_1 = __importDefault(require("bcrypt"));
const inversify_types_1 = require("./inversify.types");
const inversify_1 = require("inversify");
const configureDatabase = () => {
    return new sequelize_1.Sequelize(process.env.DATABASE, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
        dialect: 'postgres',
        host: 'localhost',
        port: Number(process.env.DATABASE_PORT)
    });
};
function configureCommonContainer(container) {
    container.bind(inversify_types_1.TYPES.Common.Database).toConstantValue(configureDatabase());
    container.bind(inversify_types_1.TYPES.Common.Encryption).toConstantValue(bcrypt_1.default);
}
function configUserModel(container) {
    module_1.UserModel.setup(container.get(inversify_types_1.TYPES.Common.Database));
    return module_1.UserModel;
}
exports.configUserModel = configUserModel;
const configureUserContainer = (container) => {
    container.bind(inversify_types_1.TYPES.User.Model).toConstantValue(configUserModel(container));
    container.bind(inversify_types_1.TYPES.User.Repository).to(module_1.UserRepository);
    container.bind(inversify_types_1.TYPES.User.Service).to(module_1.UserService);
    container.bind(inversify_types_1.TYPES.User.Controller).to(module_1.UserController);
};
function configureDIC() {
    const dependencyContainer = new inversify_1.Container();
    configureCommonContainer(dependencyContainer);
    configureUserContainer(dependencyContainer);
    return dependencyContainer;
}
const container = configureDIC();
exports.default = container;
