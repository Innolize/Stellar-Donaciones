"use strict";
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
exports.configureLocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const bcrypt_1 = require("bcrypt");
const configureLocalStrategy = (userRepository, passport) => {
    passport.use(new passport_local_1.Strategy({ usernameField: 'email' }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userRepository.findUserByEmail(email);
            if (!user) {
                return done(null, false, { message: "incorrect email" });
            }
            if (!(yield (0, bcrypt_1.compare)(password, user.password))) {
                return done(null, false, { message: "Incorrect password" });
            }
            const { kPrivate, password: userPassword } = user, rest = __rest(user, ["kPrivate", "password"]);
            return done(null, rest);
        }
        catch (error) {
            console.log(error);
            return done(error);
        }
    })));
};
exports.configureLocalStrategy = configureLocalStrategy;
