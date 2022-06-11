import { IPublicUser } from "./IPublicUser";

export interface ILoginResponse {
    user: IPublicUser,
    access_token: string
}