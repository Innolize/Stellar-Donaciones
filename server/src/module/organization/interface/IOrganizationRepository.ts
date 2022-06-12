import { Organization } from "../entity/Organization";

export interface IOrganizationRepository {
    findById: (id: number) => Promise<Organization>
}