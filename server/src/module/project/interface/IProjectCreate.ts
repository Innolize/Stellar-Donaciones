export interface IProjectCreate {
    author_id: number
    name: string
    objective: number
    description: string
    to: Date,
    id?: number
    image?: string
}