import { IUserCreate } from "../interface/IUserCreate";

export class User implements IUserCreate {
    constructor(
        public id: number,
        public name: string,
        public password: string,
        public kPublic: string,
        public kPrivate: string
    ) { }
}