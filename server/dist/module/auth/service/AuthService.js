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
exports.AuthService = void 0;
const inversify_1 = require("inversify");
const jsonwebtoken_1 = require("jsonwebtoken");
const inversify_types_1 = require("../../../config/inversify.types");
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.userRepository = userRepository;
    }
    login(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUserById(userId);
            if (!user) {
                throw Error("Usuario inexistente");
            }
            const { kPrivate, password } = user, rest = __rest(user, ["kPrivate", "password"]);
            const payload = { sub: rest.id };
            const access_token = this.signAccessToken(payload);
            return {
                user: rest,
                access_token
            };
        });
    }
    verifyToken(userToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = (0, jsonwebtoken_1.verify)(userToken, process.env.JWT_SECRET);
            const { sub } = token;
            const payload = { sub };
            const user = yield this.userRepository.findUserById(sub);
            if (!user) {
                throw Error("Usuario inexistente");
            }
            const { kPrivate, password } = user, rest = __rest(user, ["kPrivate", "password"]);
            const access_token = this.signAccessToken(payload);
            return {
                user: rest,
                access_token,
            };
        });
    }
    signAccessToken(payload) {
        return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET);
    }
};
AuthService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversify_types_1.TYPES.User.Repository)),
    __metadata("design:paramtypes", [Object])
], AuthService);
exports.AuthService = AuthService;
