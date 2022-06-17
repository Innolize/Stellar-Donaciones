"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.StellarRepository = void 0;
const StellarSDK = __importStar(require("stellar-sdk"));
const axios_1 = __importDefault(require("axios"));
const inversify_1 = require("inversify");
let StellarRepository = class StellarRepository {
    constructor() {
        this.SERVER_URL = "https://horizon-testnet.stellar.org";
        this.server = new StellarSDK.Server(this.SERVER_URL);
        this.createAccount = () => __awaiter(this, void 0, void 0, function* () {
            const newAccountKeys = StellarSDK.Keypair.random();
            const accPublicKey = newAccountKeys.publicKey();
            try {
                (yield axios_1.default.get(`https://friendbot.stellar.org?addr=${accPublicKey}`)).data;
                return {
                    publicKey: newAccountKeys.publicKey(),
                    privateKey: newAccountKeys.secret()
                };
            }
            catch (error) {
                throw Error('Error!');
            }
        });
        this.transaction = (originSecret, destinationPublic, amount) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.checkIfAccountExists(destinationPublic);
                const originKeys = StellarSDK.Keypair.fromSecret(originSecret);
                const originAccount = yield this.server.loadAccount(originKeys.publicKey());
                const transaction = new StellarSDK.TransactionBuilder(originAccount, {
                    fee: StellarSDK.BASE_FEE,
                    networkPassphrase: StellarSDK.Networks.TESTNET
                })
                    .addOperation(StellarSDK.Operation.payment({
                    destination: destinationPublic,
                    asset: StellarSDK.Asset.native(),
                    amount: amount.toString()
                }))
                    .addMemo(StellarSDK.Memo.text("Test Transaction"))
                    .setTimeout(180)
                    .build();
                transaction.sign(originKeys);
                return yield this.server.submitTransaction(transaction);
            }
            catch (error) {
                console.log(error);
                throw Error('stellar repository error');
            }
        });
        this.checkIfAccountExists = (publicKey) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.server.loadAccount(publicKey);
            }
            catch (error) {
                throw new Error("La cuenta no existe!");
            }
        });
    }
};
StellarRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], StellarRepository);
exports.StellarRepository = StellarRepository;
