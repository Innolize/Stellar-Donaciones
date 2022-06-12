import { Project } from "../entity/Project"

export interface IProjectService {
    getAll: () => Promise<Project[]>
    findById: (id: number) => Promise<Project>
}