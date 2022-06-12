import { injectable } from "inversify";
import { Association, DataTypes, Model, Sequelize } from "sequelize";
import { OrganizationModel } from "../../organization/module";
import { Project } from "../entity/Project";
import { IProjectCreate } from "../interface/IProjectCreate";

@injectable()
export class ProjectModel extends Model<Project, IProjectCreate>{
    author_id!: number
    name!: string
    goal!: number
    description!: string
    from!: Date
    to!: Date
    id!: number
    image!: string

    static setup(database: Sequelize): typeof ProjectModel {
        ProjectModel.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            author_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            goal: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            from: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            to: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
            {
                sequelize: database,
                modelName: "Project",
            }
        )
        return ProjectModel
    }

    static setupOrganizationAssociation(model: typeof OrganizationModel): typeof ProjectModel {
        ProjectModel.belongsTo(model, {
            foreignKey: "author_id",
            as: "Author"
        })
        return ProjectModel
    }

    public static associations: {
        organization: Association<ProjectModel, OrganizationModel>
    }
}