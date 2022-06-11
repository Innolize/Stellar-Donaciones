import { Sequelize } from "sequelize"
import { UserController, UserModel, UserRepository, UserService } from "../module/user/module"
import bcrypt from 'bcrypt'
import { TYPES } from "./inversify.types"
import { Container } from "inversify"


const configureDatabase = () => {
    return new Sequelize(<string>process.env.DATABASE, <string>process.env.DATABASE_USERNAME, <string>process.env.DATABASE_PASSWORD, {
        dialect: 'postgres',
        host: 'localhost',
        port: Number(<string>process.env.DATABASE_PORT)
    })
}

function configureCommonContainer(container: Container): void {
    container.bind<Sequelize>(TYPES.Common.Database).toConstantValue(configureDatabase());
    container.bind<typeof bcrypt>(TYPES.Common.Encryption).toConstantValue(bcrypt)
}

export function configUserModel(container: Container): typeof UserModel {
    UserModel.setup(container.get(TYPES.Common.Database))
    return UserModel
}

const configureUserContainer = (container: Container): void => {
    container.bind<typeof UserModel>(TYPES.User.Model).toConstantValue(configUserModel(container))
    container.bind<UserRepository>(TYPES.User.Repository).to(UserRepository)
    container.bind<UserService>(TYPES.User.Service).to(UserService)
    container.bind<UserController>(TYPES.User.Controller).to(UserController)
}

function configureDIC() {
    const dependencyContainer = new Container()
    configureCommonContainer(dependencyContainer)
    configureUserContainer(dependencyContainer)
    const db = dependencyContainer.get<Sequelize>(TYPES.Common.Database)
    db.drop().then(()=>{
        db.sync({}).then(()=>{
            console.log('database ready')
        })
    })
    
    return dependencyContainer
}

const container = configureDIC()

export default container