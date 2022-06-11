import { Project } from "../entity/Project";

export interface IProjectRepository {
    getById: (id: number) => Promise<Project>
    getAll: () => Promise<Project[]>
}