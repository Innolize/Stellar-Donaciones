export * from './model/Organization'
export * from './repository/OrganizationRepository'
export * from './service/OrganizationService'
export * from './controller/OrganizationController'

import { OrganizationCrontroller } from './controller/OrganizationController'
import { Application } from 'express'
import { Container } from 'inversify'
import { TYPES } from '../../config/inversify.types'


export const init = (app: Application, container: Container) => {
    const controller = container.get<OrganizationCrontroller>(TYPES.Organization.Controller)
    controller.configureRoutes(app)
}