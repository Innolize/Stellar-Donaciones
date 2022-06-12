import { ITransaction } from "../interface/ITransaction";

export class Transaction implements ITransaction {
    constructor(
        public id: number,
        public amount: number,
        public from: string,
        public to: string,
        public project_id: number
    ) {
    }
}