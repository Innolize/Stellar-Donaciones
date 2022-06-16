"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
const inversify_1 = require("inversify");
const sequelize_1 = require("sequelize");
let ProjectModel = ProjectModel_1 = class ProjectModel extends sequelize_1.Model {
    static setup(database) {
        ProjectModel_1.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            author_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            goal: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            from: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            to: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            image: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            }
        }, {
            sequelize: database,
            modelName: "Project",
        });
        return ProjectModel_1;
    }
    static setupOrganizationAssociation(model) {
        ProjectModel_1.belongsTo(model, {
            foreignKey: "author_id",
            as: "Author"
        });
        return ProjectModel_1;
    }
};
ProjectModel = ProjectModel_1 = __decorate([
    (0, inversify_1.injectable)()
], ProjectModel);
exports.ProjectModel = ProjectModel;
