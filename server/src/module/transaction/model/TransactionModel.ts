import { DataTypes, Model, Sequelize } from "sequelize/types";
import { Transaction } from "../entity/Transaction";
import { ITransactionCreate } from "../interface/ITransaction";

export class TransactionModel extends Model<Transaction, ITransactionCreate> implements ITransactionCreate {
    amount!: number;
    from!: string;
    to!: string;
    project_id!: number;
    id!: number;

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
            }, from: {
                type: DataTypes.STRING,
                allowNull: false
            }, to: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize: database,
            modelName: "Transaction"
        })
        return TransactionModel
    }
}