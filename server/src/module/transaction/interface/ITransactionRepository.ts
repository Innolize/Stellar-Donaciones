import { Transaction } from "../entity/Transaction";


export interface ITransactionRepository {
    getById: (id: number) => Promise<Transaction>
    getAllByProject: (project_id: number) => Promise<Transaction[]>
}