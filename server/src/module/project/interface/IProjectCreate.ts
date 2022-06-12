export interface IProjectCreate {
    author_id: number
    name: string
    goal: number
    description: string
    to: Date,
    id?: number
    image?: string
}