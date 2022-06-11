import { User } from "../Entity/User";
import { IUserCreate } from "../interface/IUserCreate";
import { IUserRepository } from "../interface/IUserRepository";
import { UserModel } from "../module";



export class UserRepository implements IUserRepository {
    private userModel: typeof UserModel
    constructor(
        userModel: typeof UserModel
    ) {
        this.userModel = userModel
    }
    async createUser(user: IUserCreate): Promise<User> {
        try {
            const username = user.name
            const checkIfExists = await this.findUserByName(username)
            if (checkIfExists) {
                throw new Error('User already exists! please, select a new one')
            }
            const newUser = await this.userModel.create(user)
            return newUser
        } catch (err) {
            throw err
        }
    }

    async findUserByName(name: string): Promise<false | User> {
        const userFound = await this.userModel.findOne({ where: { name } })
        if (userFound) return userFound
        else return false
    };
}