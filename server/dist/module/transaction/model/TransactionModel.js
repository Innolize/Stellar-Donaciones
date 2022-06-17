"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TransactionModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const inversify_1 = require("inversify");
const sequelize_1 = require("sequelize");
let TransactionModel = TransactionModel_1 = class TransactionModel extends sequelize_1.Model {
    static setup(database) {
        TransactionModel_1.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            project_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            user_id: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            organization_id: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize: database,
            modelName: "Transaction"
        });
        return TransactionModel_1;
    }
    // static setupUserAssociation(model: typeof UserModel): void {
    //     TransactionModel.hasOne(model, {
    //         as: "User",
    //         foreignKey: "user_id"
    //     })
    // }
    static setupOrganizationAssociation(model) {
        TransactionModel_1.hasOne(model, {
            as: "Organization",
            foreignKey: "organization_id"
        });
    }
    static setupProjectAssociation(model) {
        TransactionModel_1.hasOne(model, {
            as: "Project",
            foreignKey: "project_id"
        });
    }
};
TransactionModel = TransactionModel_1 = __decorate([
    (0, inversify_1.injectable)()
], TransactionModel);
exports.TransactionModel = TransactionModel;
