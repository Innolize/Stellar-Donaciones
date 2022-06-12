import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/inversify.types";
import { ProjectRepository } from "../repository/ProjectRepository";
import { IProjectService } from '../interface/IProjectService'
import { Project } from "../entity/Project";

@injectable()
export class ProjectService implements IProjectService {
    constructor(
        @inject(TYPES.Project.Repository) private projectRepository: ProjectRepository
    ) {
    }
    async getAll(): Promise<Project[]> {
        return await this.projectRepository.getAll()
    }
    async findById(id: number): Promise<Project> {
        return await this.projectRepository.getById(id)
    }
}