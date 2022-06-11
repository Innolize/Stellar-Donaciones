import { IOrganizationCreate } from "../interface/IOgranizationCreate";

export class Organization implements IOrganizationCreate {
    constructor(
        public id: number,
        public email: string,
        public password: string,
        public kPublic: string,
        public kPrivate: string
    ) { }
}