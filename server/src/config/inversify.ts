import { Sequelize } from "sequelize"
import { UserController, UserModel, UserRepository, UserService } from "../module/user/module"
import bcrypt from 'bcrypt'
import { TYPES } from "./inversify.types"
import { Container } from "inversify"
import { AuthService } from "../module/auth/service/AuthService"
import { AuthController } from "../module/auth/controller/AuthController"
import multer, { memoryStorage, Multer } from "multer"
import { OrganizationCrontroller, OrganizationModel, OrganizationRepository, OrganizationService } from "../module/organization/module"
import { ProjectModel } from "../module/project/model/ProjectModel"
import { ProjectRepository } from "../module/project/repository/ProjectRepository"
import { ProjectService } from "../module/project/service/ProjectService"
import { ProjectController } from "../module/project/controller/ProjectController"
import { TransactionModel } from "../module/transaction/model/TransactionModel"
import { TransactionRepository } from "../module/transaction/repository/TransactionRepository"
import { TransactionService } from "../module/transaction/service/TransactionService"
import { StellarRepository, StellarService } from "../module/stellar/module"
import { TransactionController } from "../module/transaction/module"

function configureUploadMiddleware() {
    const storage = memoryStorage()
    return multer({ storage })
}

const configureDatabase = () => {
    return new Sequelize(<string>process.env.DATABASE, <string>process.env.DATABASE_USERNAME, <string>process.env.DATABASE_PASSWORD, {
        dialect: 'postgres',
        host: 'localhost',
        port: Number(<string>process.env.DATABASE_PORT)
    })
}

const configureStellarContainer = (container: Container) => {
    container.bind<StellarRepository>(TYPES.Stellar.Repository).to(StellarRepository)
    container.bind<StellarService>(TYPES.Stellar.Service).to(StellarService)
}

const configureTransactionModel = (container: Container) => {
    const database = container.get<Sequelize>(TYPES.Common.Database)
    return TransactionModel.setup(database)
}

const configureTransactionContainer = (container: Container) => {
    container.bind<typeof TransactionModel>(TYPES.Transaction.Model).toConstantValue(configureTransactionModel(container))
    container.bind<TransactionRepository>(TYPES.Transaction.Repository).to(TransactionRepository)
    container.bind<TransactionService>(TYPES.Transaction.Service).to(TransactionService)
    container.bind<TransactionController>(TYPES.Transaction.Controller).to(TransactionController)

}

const configureProjectModel = (container: Container) => {
    const database = container.get<Sequelize>(TYPES.Common.Database)
    ProjectModel.setup(database)
    return ProjectModel
}

const configureProjectContainer = (container: Container) => {
    container.bind<typeof ProjectModel>(TYPES.Project.Model).toConstantValue(configureProjectModel(container))
    container.bind<ProjectRepository>(TYPES.Project.Repository).to(ProjectRepository)
    container.bind<ProjectService>(TYPES.Project.Service).to(ProjectService)
    container.bind<ProjectController>(TYPES.Project.Controller).to(ProjectController)
}

const configureOrganizationModel = (container: Container) => {
    const database = container.get<Sequelize>(TYPES.Common.Database)
    OrganizationModel.setup(database)
    return OrganizationModel
}

const configureOrganizationContainer = (container: Container) => {
    container.bind<typeof OrganizationModel>(TYPES.Organization.Model).toConstantValue(configureOrganizationModel(container))
    container.bind<OrganizationRepository>(TYPES.Organization.Repository).to(OrganizationRepository)
    container.bind<OrganizationService>(TYPES.Organization.Service).to(OrganizationService)
    container.bind<OrganizationCrontroller>(TYPES.Organization.Controller).to(OrganizationCrontroller)
}

function configureCommonContainer(container: Container): void {
    container.bind<Sequelize>(TYPES.Common.Database).toConstantValue(configureDatabase());
    container.bind<typeof bcrypt>(TYPES.Common.Encryption).toConstantValue(bcrypt)
    container.bind<Multer>(TYPES.Common.FormMiddleware).toConstantValue(configureUploadMiddleware())
}

export function configUserModel(container: Container): typeof UserModel {
    const database = container.get<Sequelize>(TYPES.Common.Database)
    UserModel.setup(database)
    return UserModel
}

const configureUserContainer = (container: Container): void => {
    container.bind<typeof UserModel>(TYPES.User.Model).toConstantValue(configUserModel(container))
    container.bind<UserRepository>(TYPES.User.Repository).to(UserRepository)
    container.bind<UserService>(TYPES.User.Service).to(UserService)
    container.bind<UserController>(TYPES.User.Controller).to(UserController)
}

const configureAuthContainer = (container: Container): void => {
    container.bind<AuthService>(TYPES.Auth.Service).to(AuthService)
    container.bind<AuthController>(TYPES.Auth.Controller).to(AuthController)
}

const associations = (container: Container) => {
    ProjectModel.setupOrganizationAssociation(container.get<typeof OrganizationModel>(TYPES.Project.Model))
    // TransactionModel.setupOrganizationAssociation(container.get<typeof OrganizationModel>(TYPES.Organization.Model))
    // TransactionModel.setupProjectAssociation(container.get<typeof ProjectModel>(TYPES.Project.Model))
    // TransactionModel.setupUserAssociation(container.get<typeof UserModel>(TYPES.User.Model))
}
function configureDIC() {
    const dependencyContainer = new Container()
    configureCommonContainer(dependencyContainer)
    configureStellarContainer(dependencyContainer)
    configureUserContainer(dependencyContainer)
    configureOrganizationContainer(dependencyContainer)
    configureProjectContainer(dependencyContainer)
    configureTransactionContainer(dependencyContainer)
    configureAuthContainer(dependencyContainer)
    associations(dependencyContainer)
    const db = dependencyContainer.get<Sequelize>(TYPES.Common.Database)
    // db.drop().then(() => {
    //     db.sync({ force: true }).then(() => {
    //         console.log('database ready')
    //     })
    // })

    return dependencyContainer
}

const container = configureDIC()

export default container