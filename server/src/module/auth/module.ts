import { Application } from 'express'
import { Container } from 'inversify'
import { TYPES } from '../../config/inversify.types'
import { AuthController } from './controller/AuthController'

export const init = (app: Application, container: Container): void => {
    const controller = container.get<AuthController>(TYPES.Auth.Controller)
    controller.configureRoutes(app)
}