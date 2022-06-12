import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/inversify.types";
import { Transaction } from "../entity/Transaction";
import { ITransactionRepository } from "../interface/ITransactionRepository";
import { TransactionModel } from "../model/TransactionModel";

@injectable()
export class TransactionRepository implements ITransactionRepository {
    constructor(
        @inject(TYPES.Transaction.Model) private transactionModel: typeof TransactionModel
    ) {
    }
    async getById(id: number): Promise<Transaction> {
        const transaction = await this.transactionModel.findByPk(id)
        if (!transaction) {
            throw Error('Transaction not found')
        }
        return transaction
    }

    async getAllByProject(project_id: string): Promise<Transaction[]> {
        return await this.transactionModel.findAll({ where: { project_id: project_id } })
    }

}