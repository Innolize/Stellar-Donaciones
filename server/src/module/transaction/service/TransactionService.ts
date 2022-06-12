import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/inversify.types";
import { Project } from "../../project/entity/Project";
import { Transaction } from "../entity/Transaction";
import { ITransactionService } from "../interface/ITransactionService";
import { TransactionRepository } from "../repository/TransactionRepository";

@injectable()
export class TransactionService implements ITransactionService {
    constructor(
        @inject(TYPES.Project.Service) private transactionRepository: TransactionRepository
    ) {
    }
    async getById(id: number): Promise<Transaction> {
        return await this.transactionRepository.getById(id)
    }
    async getByProjectId(project_id: number): Promise<Transaction[]> {
        return await this.transactionRepository.getAllByProject(project_id)
    }
}