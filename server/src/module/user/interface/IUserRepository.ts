import { User } from "../Entity/User";
import { IUserCreate } from "./IUserCreate";

export interface IUserRepository {
    createUser: (user: IUserCreate) => Promise<User>;
    findUserByName: (name: string) => Promise<User | false>;
}