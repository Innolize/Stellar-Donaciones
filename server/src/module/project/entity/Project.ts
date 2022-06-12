import { Organization } from "../../organization/entity/Organization";
import { IProject } from "../interface/IProject";

export class Project implements IProject {
    constructor(
        public author_id: number,
        public goal: number,
        public name: string,
        public description: string,
        public from: Date,
        public to: Date,
        public id?: number,
        public image?: string,
        public Author?: Organization
    ) { }
}