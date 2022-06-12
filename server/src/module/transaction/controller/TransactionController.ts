import { Application, NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/inversify.types";
import { AuthService } from "../../auth/service/AuthService";
import { jwtAuthentication, localAuthentication } from "../../auth/util/passportMiddlewares";
import { StellarService } from "../../stellar/module";
import { UserService } from "../../user/module";

@injectable()
export class TransactionController {
    ROUTE: string
    constructor(
        @inject(TYPES.Stellar.Service) private stellarService: StellarService,
        @inject(TYPES.User.Service) private userService: UserService,
    ) {
        this.ROUTE = "/transaction"
    }
    configureRoutes(app: Application) {
        const ROUTE = this.ROUTE
        app.post(`/api${ROUTE}/fund/:amount`, jwtAuthentication, this.fund.bind(this))
        app.post(`/api${ROUTE}/:destination/:amount`, jwtAuthentication, this.makeTransaction.bind(this))
    }

    makeTransaction = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const { destination, amount } = req.params
            if (!destination || !amount) {
                throw Error('Parametros incorrectos')
            }
            if (!user) {
                throw Error('No hay usuario')
            }
            const fullUser = await this.userService.findUserById(user.id)
            const numberAmount = Number(amount)
            const tx = await this.stellarService.makeTransaction(fullUser.kPrivate, destination, numberAmount)
            res.status(200).send(tx)
        } catch (err) {
            throw Error('Error en transaccion')
        }
    }
    fund = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const { amount } = req.params
            if (!amount) {
                throw Error('Parametros incorrectos')
            }
            if (!user) {
                throw Error('No hay usuario')
            }
            const userToFundPublicKey = user.kPublic
            const numberAmount = Number(amount)
            const tx = await this.stellarService.makeTransaction(<string>process.env.APP_MAIN_ACCOUNT, userToFundPublicKey, numberAmount)
            res.status(200).send(tx)

        } catch (err) {
            throw Error('Error en transaccion')
        }
    }
}