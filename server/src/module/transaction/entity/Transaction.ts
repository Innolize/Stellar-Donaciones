import { ITransactionCreate } from "../interface/ITransaction";

export class Transaction implements ITransactionCreate {
    constructor(
        public id: number,
        public amount: number,
        public from: string,
        public to: string,
        public project_id: number
    ) {
    }
}