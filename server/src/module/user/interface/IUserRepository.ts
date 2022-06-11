import { User } from "../Entity/User";
import { IUserCreate } from "./IUserCreate";

export interface IUserRepository {
    createUser: (user: IUserCreate) => Promise<User>;
    findUserByEmail: (email: string) => Promise<User | false>;
    findUserById: (id: number) => Promise<User | null>
}