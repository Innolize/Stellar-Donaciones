export interface ITransactionCreate {
    amount: number,
    from: string,
    to: string,
    project_id: number
    id?: number,
}