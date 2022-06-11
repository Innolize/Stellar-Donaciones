import { Application, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/inversify.types";
import { OrganizationService } from "../module";

@injectable()
export class OrganizationCrontroller {
    private ROUTE_BASE: string
    constructor(
        @inject(TYPES.Organization.Service) private organizationService: OrganizationService
    ) {
        this.ROUTE_BASE = "/organization"
    }

    configureRoutes(app: Application) {
        const ROUTE = this.ROUTE_BASE
        app.post(`/api${ROUTE}`, this.findById.bind(this))

    }

    async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id
            const idNumber = Number(id)
            if (!idNumber) {
                throw Error('Invalid user id')
            }
            const user = await this.organizationService.findById(idNumber)
            res.status(StatusCodes.ACCEPTED).send(user)
        } catch (error) {
            next(error)
        }
    }
}