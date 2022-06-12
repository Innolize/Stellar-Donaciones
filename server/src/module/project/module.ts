import { Application } from 'express'
import { Container } from 'inversify'
import { TYPES } from '../../config/inversify.types'
import { ProjectController } from './controller/ProjectController'

export * from './controller/ProjectController'
export * from './model/ProjectModel'
export * from './repository/ProjectRepository'
export * from './service/ProjectService'


export const init = (app: Application, container: Container): void => {
    const projectController = container.get<ProjectController>(TYPES.Project.Controller)
    projectController.configureRoutes(app)
}