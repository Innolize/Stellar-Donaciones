import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/inversify.types";
import { Organization } from "../entity/Organization";
import { IOrganizationRepository } from '../interface/IOrganizationRepository'
import { OrganizationModel } from "../module";

@injectable()
export class OrganizationRepository implements IOrganizationRepository {
    constructor(
        @inject(TYPES.Organization.Model) private organizationModel: typeof OrganizationModel
    ) { }

    async findById(id: number): Promise<Organization> {
        const organization = await this.organizationModel.findByPk(id, { raw: true })
        if (!organization) {
            throw Error('Organization not found')
        }
        return organization
    }
}