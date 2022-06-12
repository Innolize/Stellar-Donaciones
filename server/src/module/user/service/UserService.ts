import { IUserCreate } from "../interface/IUserCreate"
import { IUserRepository } from "../interface/IUserRepository"
import bcrypt from 'bcrypt'
import { User } from "../Entity/User"
import CryptoJS from 'crypto-js'
import { IUserService } from "../interface/IUserService"
import { inject, injectable } from "inversify"
import { TYPES } from "../../../config/inversify.types"
import { StellarRepository } from "../../stellar/module"

@injectable()
export class UserService implements IUserService {
    private userRepository: IUserRepository
    private encryption: typeof bcrypt
    constructor(
        @inject(TYPES.User.Repository) userRepository: IUserRepository,
        @inject(TYPES.Common.Encryption) encryption: typeof bcrypt,
        @inject(TYPES.Stellar.Repository) private stellarRepository: StellarRepository
    ) {
        this.userRepository = userRepository
        this.encryption = encryption
    }

    async createUser(user: IUserCreate): Promise<User> {
        try {
            await this.userRepository.findUserByEmail(user.email)
            const keys = await this.stellarRepository.createAccount()
            const hashedPassword = await this._hashPassword(user.password)
            const userHashed: IUserCreate = { ...user, password: hashedPassword, kPublic: keys.publicKey, kPrivate: keys.privateKey }
            return await this.userRepository.createUser(userHashed)
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    async findUserByEmail(name: string): Promise<User | false> {
        return await this.userRepository.findUserByEmail(name)
    }

    async findUserById(id: number): Promise<User> {
        return await this.userRepository.findUserById(id)
    }

    private async _hashPassword(password: string): Promise<string> {
        return await this.encryption.hash(password, Number(<string>process.env.BCRYPT_SALT_NUMBER))
    }

    private _hashKPrivate(kPrivate: string): string {
        return CryptoJS.AES.encrypt(kPrivate, <string>process.env.CRYPTO_SECRET).toString()
    }
}