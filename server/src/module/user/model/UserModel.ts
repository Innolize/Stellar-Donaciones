import { injectable } from "inversify"
import { DataTypes, Model, Sequelize } from "sequelize"
import { User } from "../Entity/User"
import { IUserCreate } from "../interface/IUserCreate"

@injectable()
export class UserModel extends Model<User, IUserCreate> implements IUserCreate {
    id!: number
    email!: string
    password!: string
    kPublic!: string
    kPrivate!: string

    static setup(database: Sequelize): typeof UserModel {
        UserModel.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                unique: true,
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            kPrivate: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            kPublic: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
            {
                sequelize: database,
                modelName: "User",
            }
        )
        return UserModel
    }
}