import { Transaction } from "../entity/Transaction"

export interface ITransactionService {
    getById: (id: number) => Promise<Transaction>
    getByProjectId: (project_id: number) => Promise<Transaction[]>
}