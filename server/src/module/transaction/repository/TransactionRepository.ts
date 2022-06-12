import { raw } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/inversify.types";
import { Transaction } from "../entity/Transaction";
import { ITransactionCreate } from "../interface/ITransaction";
import { ITransactionRepository } from "../interface/ITransactionRepository";
import { TransactionModel } from "../model/TransactionModel";

@injectable()
export class TransactionRepository implements ITransactionRepository {
    constructor(
        @inject(TYPES.Transaction.Model) private transactionModel: typeof TransactionModel
    ) {
    }

    async create(transaction: ITransactionCreate): Promise<Transaction> {
        return await this.transactionModel.create(transaction, { raw: true })
    }

    async getById(id: number): Promise<Transaction> {
        const transaction = await this.transactionModel.findByPk(id, { raw: true })
        if (!transaction) {
            throw Error('Transaction not found')
        }
        return transaction
    }

    async getAllByProject(project_id: number): Promise<Transaction[]> {
        return await this.transactionModel.findAll({ where: { project_id }, raw: true })
    }

}