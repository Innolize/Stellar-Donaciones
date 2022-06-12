import { Transaction } from "../entity/Transaction";


export interface ITransactionRepository {
    getById: (id: number) => Promise<Transaction>
    getAllByProject: (project_id: string) => Promise<Transaction[]>
}