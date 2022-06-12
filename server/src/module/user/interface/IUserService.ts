import { User } from "../Entity/User";
import { IUserCreate } from "./IUserCreate";

export interface IUserService {
    createUser: (user: IUserCreate) => Promise<User>;
    findUserByEmail: (email: string) => Promise<User | false>;
    findUserById: (id: number) => Promise<User>
}