import { UserModel } from './model/UserModel'
import { UserRepository } from './repository/UserRepository'
import { UserService } from './service/UserService'
import { UserController } from './controller/UserController'
import DIContainer from 'rsdi'
import { Application } from 'express'

export * from './model/UserModel'
export * from './repository/UserRepository'
export * from './service/UserService'
export * from './controller/UserController'

export const init = (app: Application, container: DIContainer) => {
    const controller = container.get<UserController>('UserController')
    controller.configureRoutes(app)
}
