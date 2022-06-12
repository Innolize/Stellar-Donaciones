import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/inversify.types";
import { Project } from "../entity/Project";
import { IProjectRepository } from "../interface/IProjectRepository";
import { ProjectModel } from '../model/ProjectModel'

@injectable()
export class ProjectRepository implements IProjectRepository {
    constructor(
        @inject(TYPES.Project.Model) private projectModel: typeof ProjectModel
    ) { }
    async getById(id: number): Promise<Project> {
        const project = await this.projectModel.findByPk(id, { raw: true })
        if (!project) {
            throw Error('No se encontro proyecto!')
        }
        return project
    }
    async getAll(): Promise<Project[]> {
        return await this.projectModel.findAll({ raw: true })
    }

}