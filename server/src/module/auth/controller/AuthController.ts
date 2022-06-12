import { Application, NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { Multer } from "multer";
import { TYPES } from "../../../config/inversify.types";
import { bodyValidator } from "../../common/helper/bodyValidator";
import { validateCreateUserDto } from "../../user/helper/create_dto_validator";
import { IUserCreate } from "../../user/interface/IUserCreate";
import { IUserService } from "../../user/interface/IUserService";
import { IPublicUser } from "../interface/IPublicUser";
import { AuthService } from "../service/AuthService";
import { jwtAuthentication, localAuthentication } from "../util/passportMiddlewares";

@injectable()
export class AuthController {
    private ROUTE: string
    constructor(
        @inject(TYPES.Auth.Service) private authService: AuthService,
        @inject(TYPES.User.Service) private userService: IUserService,
        @inject(TYPES.Common.FormMiddleware) private formMiddleware: Multer,
    ) {
        this.ROUTE = "/auth"
    }

    configureRoutes = (app: Application) => {
        const ROUTE = this.ROUTE
        app.post(`/api${ROUTE}/signup`, this.formMiddleware.none(), this.signup.bind(this))
        app.post(`/api${ROUTE}`, localAuthentication, this.login.bind(this))
        app.post(`/api${ROUTE}/me`, this.verifyToken.bind(this))

    }

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
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

    async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.headers.authorization) {
                res.status(403).send({ message: "Tu petición no tiene cabecera de autorización" })
            }
            const token = req.headers.authorization!.split(" ")[1]
            const { ...clientResponse } = await this.authService.verifyToken(token)
            res.status(200).send(clientResponse)
        } catch (err) {
            next(err)
        }
    }
}