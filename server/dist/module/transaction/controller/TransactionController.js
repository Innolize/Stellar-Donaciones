"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const inversify_1 = require("inversify");
const inversify_types_1 = require("../../../config/inversify.types");
const passportMiddlewares_1 = require("../../auth/util/passportMiddlewares");
const module_1 = require("../../stellar/module");
const module_2 = require("../../user/module");
let TransactionController = class TransactionController {
    constructor(stellarService, userService) {
        this.stellarService = stellarService;
        this.userService = userService;
        this.makeTransaction = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { destination, amount } = req.params;
                if (!destination || !amount) {
                    throw Error('Parametros incorrectos');
                }
                if (!user) {
                    throw Error('No hay usuario');
                }
                const fullUser = yield this.userService.findUserById(user.id);
                const numberAmount = Number(amount);
                const tx = yield this.stellarService.makeTransaction(fullUser.kPrivate, destination, numberAmount);
                res.status(200).send(tx);
            }
            catch (err) {
                throw Error('Error en transaccion');
            }
        });
        this.fund = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { amount } = req.params;
                if (!amount) {
                    throw Error('Parametros incorrectos');
                }
                if (!user) {
                    throw Error('No hay usuario');
                }
                const userToFundPublicKey = user.kPublic;
                const numberAmount = Number(amount);
                const tx = yield this.stellarService.makeTransaction(process.env.APP_MAIN_ACCOUNT, userToFundPublicKey, numberAmount);
                res.status(200).send(tx);
            }
            catch (err) {
                throw Error('Error en transaccion');
            }
        });
        this.ROUTE = "/transaction";
    }
    configureRoutes(app) {
        const ROUTE = this.ROUTE;
        app.post(`/api${ROUTE}/fund/:amount`, passportMiddlewares_1.jwtAuthentication, this.fund.bind(this));
        app.post(`/api${ROUTE}/:destination/:amount`, passportMiddlewares_1.jwtAuthentication, this.makeTransaction.bind(this));
    }
};
TransactionController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversify_types_1.TYPES.Stellar.Service)),
    __param(1, (0, inversify_1.inject)(inversify_types_1.TYPES.User.Service)),
    __metadata("design:paramtypes", [module_1.StellarService,
        module_2.UserService])
], TransactionController);
exports.TransactionController = TransactionController;
