"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
class Organization {
    constructor(id, email, password, kPublic, kPrivate) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.kPublic = kPublic;
        this.kPrivate = kPrivate;
    }
}
exports.Organization = Organization;
