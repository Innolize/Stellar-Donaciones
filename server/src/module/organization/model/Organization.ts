import { injectable } from "inversify"
import { DataTypes, Model, Sequelize } from "sequelize"
import { Organization } from "../entity/Organization"
import { IOrganizationCreate } from "../interface/IOgranizationCreate"

@injectable()
export class OrganizationModel extends Model<Organization, IOrganizationCreate> implements IOrganizationCreate {
    id!: number
    email!: string
    password!: string
    role_id!: number
    kPublic!: string
    kPrivate!: string

    static setup(database: Sequelize): typeof OrganizationModel {
        OrganizationModel.init({
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
                modelName: "Organization",
            }
        )
        return OrganizationModel
    }
}