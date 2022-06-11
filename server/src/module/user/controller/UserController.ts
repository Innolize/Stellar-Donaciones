import { Application, NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { IUserService } from "../interface/IUserService"

import { IUserController } from "../interface/IUserController"
import { TYPES } from "../../../config/inversify.types"
import { inject, injectable } from "inversify"
import { IUserCreate } from "../interface/IUserCreate"
import { bodyValidator } from "../../common/helper/bodyValidator"
import { validateCreateUserDto } from "../helper/create_dto_validator"

@injectable()
export class UserController implements IUserController {
    private ROUTE_BASE: string
    constructor(
        @inject(TYPES.User.Service) private userService: IUserService,
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
            const dto: IUserCreate = req.body
            const validatedDto = await bodyValidator(validateCreateUserDto, dto)
            const createdUser = await this.userService.createUser(validatedDto)
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