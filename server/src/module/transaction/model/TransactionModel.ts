import { Association, DataTypes, Model, Sequelize } from "sequelize/types";
import { Organization } from "../../organization/entity/Organization";
import { OrganizationModel } from "../../organization/module";
import { Project } from "../../project/entity/Project";
import { ProjectModel } from "../../project/module";
import { User } from "../../user/Entity/User";
import { UserModel } from "../../user/module";
import { Transaction } from "../entity/Transaction";
import { ITransactionCreate } from "../interface/ITransaction";

export class TransactionModel extends Model<Transaction, ITransactionCreate> implements ITransactionCreate {
    amount!: number;
    user_id!: string;
    organization_id!: string;
    project_id!: number;
    id!: number;
    Organization?: Organization;
    User?: User;
    Project?: Project

    static setup(database: Sequelize): typeof TransactionModel {
        TransactionModel.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            project_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            organization_id: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize: database,
            modelName: "Transaction"
        })
        return TransactionModel
    }

    static setupUserAssociation(model: typeof UserModel): void {
        TransactionModel.hasOne(model, {
            as: "User",
            foreignKey: "user_id"
        })
    }

    static setupOrganizationAssociation(model: typeof OrganizationModel): void {
        TransactionModel.hasOne(model, {
            as: "Organization",
            foreignKey: "organization_id"
        })
    }

    static setupProjectAssociation(model: typeof ProjectModel): void {
        TransactionModel.hasOne(model, {
            as: "Project",
            foreignKey: "project_id"
        })
    }

    public static associations: {
        user: Association<TransactionModel, UserModel>
        organization: Association<TransactionModel, OrganizationModel>
        project: Association<TransactionModel, OrganizationModel>
    }
}