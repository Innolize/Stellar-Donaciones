import { Application } from 'express'
import { Container } from 'inversify'
import { TYPES } from '../../config/inversify.types'
import { TransactionController } from './controller/TransactionController'
export * from './controller/TransactionController'
export * from './repository/TransactionRepository'
export * from './service/TransactionService'

export const init = (app: Application, container: Container) => {
    const controller = container.get<TransactionController>(TYPES.Transaction.Controller)
    controller.configureRoutes(app)
}