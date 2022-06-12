import { Application, NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"
import { TYPES } from "../../../config/inversify.types"
import { IProjectCreate } from "../interface/IProjectCreate"
import { IProjectService } from "../interface/IProjectService"

@injectable()
export class ProjectController {
    private ROUTE_BASE: string
    constructor(
        @inject(TYPES.Project.Service) private projectService: IProjectService,
    ) {
        this.ROUTE_BASE = "/project"
    }

    configureRoutes(app: Application): void {
        const ROUTE = this.ROUTE_BASE
        app.post(`/api${ROUTE}`, this.getProjects.bind(this))
        app.get(`/api${ROUTE}/:id`, this.getProject.bind(this))
    }

    async getProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await this.projectService.getAll()
            res.status(StatusCodes.ACCEPTED).send(user)
        } catch (error) {
            next(error)
        }
    }

    async getProject(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id
            const idNumber = Number(id)
            if (!idNumber) {
                throw Error('Invalid id')
            }
            const user = await this.projectService.findById(idNumber)
            res.status(StatusCodes.ACCEPTED).send(user)
        } catch (error) {
            next(error)
        }
    }
}