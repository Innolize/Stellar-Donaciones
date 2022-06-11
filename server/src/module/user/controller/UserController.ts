import { Application, NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { IUserCreate } from "../interface/IUserCreate"
import { IUserService } from "../interface/IUserService"
import { validate } from 'class-validator'
import { IUserController } from "../interface/IUserController"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"

export class UserController implements IUserController {
    private ROUTE_BASE: string
    constructor(
        private userService: IUserService
    ) {
        this.ROUTE_BASE = "/user"
        this.userService = userService
    }

    configureRoutes(app: Application): void {
        const ROUTE = this.ROUTE_BASE
        app.post(`/api${ROUTE}`, this.createUser.bind(this))
        app.get(`/api${ROUTE}/:id`, this.getSingleUser.bind(this))
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dto = req.body as unknown as IUserCreate
            const validationErrors = await validate(dto)
            if (validationErrors.length) {
                throw Error(`Validation failed. errors: ${validationErrors}`)
            }
            const createdUser = await this.userService.createUser(dto)
            res.status(StatusCodes.CREATED).send(createdUser)
        } catch (err) {
            next(err)
        }
    }
    async getSingleUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id
            const idNumber = Number(id)
            if (!idNumber) {
                throw Error('Invalid user id')
            }
            const user = await this.userService.findUserById(idNumber)
            res.status(StatusCodes.ACCEPTED).send(user)
        } catch (error) {
            next(error)
        }

    }

}