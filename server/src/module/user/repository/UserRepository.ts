import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/inversify.types";
import { User } from "../Entity/User";
import { IUserCreate } from "../interface/IUserCreate";
import { IUserRepository } from "../interface/IUserRepository";
import { UserModel } from "../module";

@injectable()
export class UserRepository implements IUserRepository {
    private userModel: typeof UserModel
    constructor(
        @inject(TYPES.User.Model) userModel: typeof UserModel
    ) {
        this.userModel = userModel
    }
    async createUser(user: IUserCreate): Promise<User> {
        try {
            const username = user.email
            const checkIfExists = await this.findUserByEmail(username)
            if (checkIfExists) {
                throw new Error('User already exists! please, select a new one')
            }
            //La key publica y privada la creamos con stellar, asi que por el momento dejamos esto de template//
            const newUser = await this.userModel.create({ ...user, kPrivate: 'kprivateTemporal', kPublic: 'kpublicTemporal' })
            return newUser
        } catch (err) {
            console.log(err)
            throw Error('error')
        }
    }

    async findUserByEmail(email: string): Promise<false | User> {
        console.log(email)
        const userFound = await this.userModel.findOne({ where: { email }, raw: true })
        if (userFound) return userFound
        else return false
    };

    async findUserById(id: number): Promise<User> {
        const user = await this.userModel.findByPk(id, { raw: true })
        if (!user) {
            throw Error('No se encontro usuario!')
        }
        return user
    };
}