"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, email, password, kPublic, kPrivate) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.kPublic = kPublic;
        this.kPrivate = kPrivate;
    }
}
exports.User = User;
