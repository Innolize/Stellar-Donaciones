import { Transaction } from "../entity/Transaction";
import { ITransactionCreate } from "./ITransaction";


export interface ITransactionRepository {
    create: (transaction: ITransactionCreate) => Promise<Transaction>
    getById: (id: number) => Promise<Transaction>
    getAllByProject: (project_id: number) => Promise<Transaction[]>
}