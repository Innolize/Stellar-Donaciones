import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/inversify.types";
import { Organization } from "../entity/Organization";
import { IOrganizationRepository } from "../interface/IOrganizationRepository";
import { IOrganizationService } from '../interface/IOrganizationService'

@injectable()
export class OrganizationService implements IOrganizationService {
    constructor(
        @inject(TYPES.Organization.Repository) private organizationRepository: IOrganizationRepository
    ) {
    }
    async findById(id: number): Promise<Organization> {
        return await this.organizationRepository.findById(id)
    }
}