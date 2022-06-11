import { Application, NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/inversify.types";
import { bodyValidator } from "../../common/helper/bodyValidator";
import { validateCreateUserDto } from "../../user/helper/create_dto_validator";
import { IUserCreate } from "../../user/interface/IUserCreate";
import { IUserService } from "../../user/interface/IUserService";
import { IPublicUser } from "../interface/IPublicUser";
import { AuthService } from "../service/AuthService";
import { localAuthentication } from "../util/passportMiddlewares";

@injectable()
export class AuthController {
    private ROUTE: string
    constructor(
        @inject(TYPES.Auth.Service) private authService: AuthService,
        @inject(TYPES.User.Service) private userService: IUserService
    ) {
        this.ROUTE = "/auth"
    }

    configureRoutes = (app: Application) => {
        const ROUTE = this.ROUTE
        app.post(`/api${ROUTE}/signup`, this.signup.bind(this))
        app.post(`/api${ROUTE}`, localAuthentication, this.login.bind(this))
    }

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.body)
            const dto: IUserCreate = req.body
            const validatedDto = await bodyValidator(validateCreateUserDto, dto)
            const { id } = await this.userService.createUser(validatedDto)
            const response = await this.authService.login(id)
            res.status(200).send(response)
        } catch (err) {
            next(err)
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user as IPublicUser
            console.log(user)
            const { id } = user
            const response = await this.authService.login(id)
            res.status(200).send(response)
        } catch (err) {
            next(err)
        }

    }
}