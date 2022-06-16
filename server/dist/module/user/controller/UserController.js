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
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const inversify_types_1 = require("../../../config/inversify.types");
const inversify_1 = require("inversify");
const bodyValidator_1 = require("../../common/helper/bodyValidator");
const create_dto_validator_1 = require("../helper/create_dto_validator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.ROUTE_BASE = "/user";
        this.userService = userService;
    }
    configureRoutes(app) {
        const ROUTE = this.ROUTE_BASE;
        app.post(`/api${ROUTE}`, this.createUser.bind(this));
        app.get(`/api${ROUTE}/:id`, this.getSingleUser.bind(this));
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = req.body;
                const validatedDto = yield (0, bodyValidator_1.bodyValidator)(create_dto_validator_1.validateCreateUserDto, dto);
                const createdUser = yield this.userService.createUser(validatedDto);
                res.status(http_status_codes_1.StatusCodes.CREATED).send(createdUser);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getSingleUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const idNumber = Number(id);
                if (!idNumber) {
                    throw Error('Invalid user id');
                }
                const user = yield this.userService.findUserById(idNumber);
                res.status(http_status_codes_1.StatusCodes.ACCEPTED).send(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversify_types_1.TYPES.User.Service)),
    __metadata("design:paramtypes", [Object])
], UserController);
exports.UserController = UserController;
