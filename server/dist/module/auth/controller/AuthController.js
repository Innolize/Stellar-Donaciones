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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const inversify_1 = require("inversify");
const inversify_types_1 = require("../../../config/inversify.types");
const bodyValidator_1 = require("../../common/helper/bodyValidator");
const create_dto_validator_1 = require("../../user/helper/create_dto_validator");
const AuthService_1 = require("../service/AuthService");
const passportMiddlewares_1 = require("../util/passportMiddlewares");
let AuthController = class AuthController {
    constructor(authService, userService, formMiddleware) {
        this.authService = authService;
        this.userService = userService;
        this.formMiddleware = formMiddleware;
        this.configureRoutes = (app) => {
            const ROUTE = this.ROUTE;
            app.post(`/api${ROUTE}/signup`, this.formMiddleware.none(), this.signup.bind(this));
            app.post(`/api${ROUTE}`, passportMiddlewares_1.localAuthentication, this.login.bind(this));
            app.post(`/api${ROUTE}/me`, this.verifyToken.bind(this));
        };
        this.ROUTE = "/auth";
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = req.body;
                const validatedDto = yield (0, bodyValidator_1.bodyValidator)(create_dto_validator_1.validateCreateUserDto, dto);
                const { id } = yield this.userService.createUser(validatedDto);
                const response = yield this.authService.login(id);
                res.status(200).send(response);
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                console.log(user);
                const { id } = user;
                const response = yield this.authService.login(id);
                res.status(200).send(response);
            }
            catch (err) {
                next(err);
            }
        });
    }
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.headers.authorization) {
                    res.status(403).send({ message: "Tu petición no tiene cabecera de autorización" });
                }
                const token = req.headers.authorization.split(" ")[1];
                const clientResponse = __rest(yield this.authService.verifyToken(token), []);
                res.status(200).send(clientResponse);
            }
            catch (err) {
                next(err);
            }
        });
    }
};
AuthController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversify_types_1.TYPES.Auth.Service)),
    __param(1, (0, inversify_1.inject)(inversify_types_1.TYPES.User.Service)),
    __param(2, (0, inversify_1.inject)(inversify_types_1.TYPES.Common.FormMiddleware)),
    __metadata("design:paramtypes", [AuthService_1.AuthService, Object, Object])
], AuthController);
exports.AuthController = AuthController;
