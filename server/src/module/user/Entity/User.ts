import { IUserCreate } from "../interface/IUserInterface";

export class User implements IUserCreate {
    constructor(
        public id: number,
        public name: string,
        public password: string,
        public kPublic: string,
        public kPrivate: string
    ) { }
}