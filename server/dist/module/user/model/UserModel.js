"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const inversify_1 = require("inversify");
const sequelize_1 = require("sequelize");
let UserModel = UserModel_1 = class UserModel extends sequelize_1.Model {
    static setup(database) {
        UserModel_1.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                unique: true,
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            kPrivate: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            kPublic: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            }
        }, {
            sequelize: database,
            modelName: "User",
        });
        return UserModel_1;
    }
};
UserModel = UserModel_1 = __decorate([
    (0, inversify_1.injectable)()
], UserModel);
exports.UserModel = UserModel;
