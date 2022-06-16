"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const AuthService_1 = require("../module/auth/service/AuthService");
const AuthController_1 = require("../module/auth/controller/AuthController");
const multer_1 = __importStar(require("multer"));
const module_2 = require("../module/organization/module");
const ProjectModel_1 = require("../module/project/model/ProjectModel");
const ProjectRepository_1 = require("../module/project/repository/ProjectRepository");
const ProjectService_1 = require("../module/project/service/ProjectService");
const ProjectController_1 = require("../module/project/controller/ProjectController");
const TransactionModel_1 = require("../module/transaction/model/TransactionModel");
const TransactionRepository_1 = require("../module/transaction/repository/TransactionRepository");
const TransactionService_1 = require("../module/transaction/service/TransactionService");
const module_3 = require("../module/stellar/module");
const module_4 = require("../module/transaction/module");
function configureUploadMiddleware() {
    const storage = (0, multer_1.memoryStorage)();
    return (0, multer_1.default)({ storage });
}
const configureDatabase = () => {
    return new sequelize_1.Sequelize(process.env.DATABASE, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
        dialect: 'postgres',
        host: 'localhost',
        port: Number(process.env.DATABASE_PORT)
    });
};
const configureStellarContainer = (container) => {
    container.bind(inversify_types_1.TYPES.Stellar.Repository).to(module_3.StellarRepository);
    container.bind(inversify_types_1.TYPES.Stellar.Service).to(module_3.StellarService);
};
const configureTransactionModel = (container) => {
    const database = container.get(inversify_types_1.TYPES.Common.Database);
    return TransactionModel_1.TransactionModel.setup(database);
};
const configureTransactionContainer = (container) => {
    container.bind(inversify_types_1.TYPES.Transaction.Model).toConstantValue(configureTransactionModel(container));
    container.bind(inversify_types_1.TYPES.Transaction.Repository).to(TransactionRepository_1.TransactionRepository);
    container.bind(inversify_types_1.TYPES.Transaction.Service).to(TransactionService_1.TransactionService);
    container.bind(inversify_types_1.TYPES.Transaction.Controller).to(module_4.TransactionController);
};
const configureProjectModel = (container) => {
    const database = container.get(inversify_types_1.TYPES.Common.Database);
    ProjectModel_1.ProjectModel.setup(database);
    return ProjectModel_1.ProjectModel;
};
const configureProjectContainer = (container) => {
    container.bind(inversify_types_1.TYPES.Project.Model).toConstantValue(configureProjectModel(container));
    container.bind(inversify_types_1.TYPES.Project.Repository).to(ProjectRepository_1.ProjectRepository);
    container.bind(inversify_types_1.TYPES.Project.Service).to(ProjectService_1.ProjectService);
    container.bind(inversify_types_1.TYPES.Project.Controller).to(ProjectController_1.ProjectController);
};
const configureOrganizationModel = (container) => {
    const database = container.get(inversify_types_1.TYPES.Common.Database);
    module_2.OrganizationModel.setup(database);
    return module_2.OrganizationModel;
};
const configureOrganizationContainer = (container) => {
    container.bind(inversify_types_1.TYPES.Organization.Model).toConstantValue(configureOrganizationModel(container));
    container.bind(inversify_types_1.TYPES.Organization.Repository).to(module_2.OrganizationRepository);
    container.bind(inversify_types_1.TYPES.Organization.Service).to(module_2.OrganizationService);
    container.bind(inversify_types_1.TYPES.Organization.Controller).to(module_2.OrganizationCrontroller);
};
function configureCommonContainer(container) {
    container.bind(inversify_types_1.TYPES.Common.Database).toConstantValue(configureDatabase());
    container.bind(inversify_types_1.TYPES.Common.Encryption).toConstantValue(bcrypt_1.default);
    container.bind(inversify_types_1.TYPES.Common.FormMiddleware).toConstantValue(configureUploadMiddleware());
}
function configUserModel(container) {
    const database = container.get(inversify_types_1.TYPES.Common.Database);
    module_1.UserModel.setup(database);
    return module_1.UserModel;
}
exports.configUserModel = configUserModel;
const configureUserContainer = (container) => {
    container.bind(inversify_types_1.TYPES.User.Model).toConstantValue(configUserModel(container));
    container.bind(inversify_types_1.TYPES.User.Repository).to(module_1.UserRepository);
    container.bind(inversify_types_1.TYPES.User.Service).to(module_1.UserService);
    container.bind(inversify_types_1.TYPES.User.Controller).to(module_1.UserController);
};
const configureAuthContainer = (container) => {
    container.bind(inversify_types_1.TYPES.Auth.Service).to(AuthService_1.AuthService);
    container.bind(inversify_types_1.TYPES.Auth.Controller).to(AuthController_1.AuthController);
};
const associations = (container) => {
    ProjectModel_1.ProjectModel.setupOrganizationAssociation(container.get(inversify_types_1.TYPES.Project.Model));
    // TransactionModel.setupOrganizationAssociation(container.get<typeof OrganizationModel>(TYPES.Organization.Model))
    // TransactionModel.setupProjectAssociation(container.get<typeof ProjectModel>(TYPES.Project.Model))
    // TransactionModel.setupUserAssociation(container.get<typeof UserModel>(TYPES.User.Model))
};
function configureDIC() {
    const dependencyContainer = new inversify_1.Container();
    configureCommonContainer(dependencyContainer);
    configureStellarContainer(dependencyContainer);
    configureUserContainer(dependencyContainer);
    configureOrganizationContainer(dependencyContainer);
    configureProjectContainer(dependencyContainer);
    configureTransactionContainer(dependencyContainer);
    configureAuthContainer(dependencyContainer);
    associations(dependencyContainer);
    const db = dependencyContainer.get(inversify_types_1.TYPES.Common.Database);
    // db.drop().then(() => {
    //     db.sync({ force: true }).then(() => {
    //         console.log('database ready')
    //     })
    // })
    return dependencyContainer;
}
const container = configureDIC();
exports.default = container;
