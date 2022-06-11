import { Organization } from "../entity/Organization";

export interface IOrganizationService {
    findById: (id: number) => Promise<Organization>
}