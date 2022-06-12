export interface ITransactionCreate {
    amount: number,
    user_id: string,
    organization_id: string,
    project_id: number
    id?: number,
}