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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const inversify_1 = require("inversify");
const inversify_types_1 = require("../../../config/inversify.types");
const module_1 = require("../../stellar/module");
let UserService = class UserService {
    constructor(userRepository, encryption, stellarRepository) {
        this.stellarRepository = stellarRepository;
        this.userRepository = userRepository;
        this.encryption = encryption;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userRepository.findUserByEmail(user.email);
                const keys = yield this.stellarRepository.createAccount();
                const hashedPassword = yield this._hashPassword(user.password);
                const userHashed = Object.assign(Object.assign({}, user), { password: hashedPassword, kPublic: keys.publicKey, kPrivate: keys.privateKey });
                return yield this.userRepository.createUser(userHashed);
            }
            catch (error) {
                console.log(error);
                throw new Error();
            }
        });
    }
    findUserByEmail(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findUserByEmail(name);
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findUserById(id);
        });
    }
    _hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.encryption.hash(password, Number(process.env.BCRYPT_SALT_NUMBER));
        });
    }
    _hashKPrivate(kPrivate) {
        return crypto_js_1.default.AES.encrypt(kPrivate, process.env.CRYPTO_SECRET).toString();
    }
};
UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(inversify_types_1.TYPES.User.Repository)),
    __param(1, (0, inversify_1.inject)(inversify_types_1.TYPES.Common.Encryption)),
    __param(2, (0, inversify_1.inject)(inversify_types_1.TYPES.Stellar.Repository)),
    __metadata("design:paramtypes", [Object, Object, module_1.StellarRepository])
], UserService);
exports.UserService = UserService;
