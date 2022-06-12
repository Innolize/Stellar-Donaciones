import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/inversify.types";
import { IAccountKeys } from "../interface/IAccountKeys";
import { StellarRepository } from "../repository/StellarRepository";

@injectable()
export class StellarService {
    constructor(
        @inject(TYPES.Stellar.Repository) private stellarRepository: StellarRepository
    ) { }
    createAccount = async (): Promise<IAccountKeys> => {
        return await this.stellarRepository.createAccount()
    }
    makeTransaction = async (originSecret: string, destinationPublic: string, amount: number) => {
        return this.stellarRepository.transaction(originSecret, destinationPublic, amount)
    }
}
