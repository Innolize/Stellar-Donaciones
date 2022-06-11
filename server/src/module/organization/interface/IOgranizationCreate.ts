export interface IOrganizationCreate {
    id?: number,
    email: string,
    password: string,
    kPublic: string,
    kPrivate: string
}