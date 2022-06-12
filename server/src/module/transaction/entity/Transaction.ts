import { Organization } from "../../organization/entity/Organization";
import { Project } from "../../project/entity/Project";
import { User } from "../../user/Entity/User";
import { ITransactionCreate } from "../interface/ITransaction";

export class Transaction implements ITransactionCreate {
    constructor(
        public id: number,
        public amount: number,
        public user_id: string,
        public organization_id: string,
        public project_id: number,
        public Organization?: Organization,
        public User?: User,
        public Project?: Project
    ) { }
}