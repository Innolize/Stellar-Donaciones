import { UserModel } from './model/UserModel'
import { UserRepository } from './repository/UserRepository'
import { UserService } from './service/UserService'
import { UserController } from './controller/UserController'
import { Application } from 'express'
import { Container } from 'inversify'
import { TYPES } from '../../config/inversify.types'

export * from './model/UserModel'
export * from './repository/UserRepository'
export * from './service/UserService'
export * from './controller/UserController'

export const init = (app: Application, container: Container) => {
    const controller = container.get<UserController>(TYPES.User.Controller)
    controller.configureRoutes(app)
}
