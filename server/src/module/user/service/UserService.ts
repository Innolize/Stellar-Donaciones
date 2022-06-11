import { IUserCreate } from "../interface/IUserCreate"
import { IUserRepository } from "../interface/IUserRepository"
import bcrypt from 'bcrypt'
import { User } from "../Entity/User"
import CryptoJS from 'crypto-js'
import { IUserService } from "../interface/IUserService"

export class UserService implements IUserService {
    private userRepository: IUserRepository
    private encryption: typeof bcrypt
    constructor(
        userRepository: IUserRepository,
        encryption: typeof bcrypt
    ) {
        this.userRepository = userRepository
        this.encryption = encryption
    }

    async createUser(user: IUserCreate): Promise<User> {
        await this.userRepository.findUserByName(user.name)
        const hashedPassword = await this._hashPassword(user.password)
        const hashKPrivate = this._hashKPrivate(user.password)
        const userHashed: IUserCreate = { ...user, password: hashedPassword, kPrivate: hashKPrivate }
        return await this.userRepository.createUser(userHashed)
    }

    async findUserByName(name: string): Promise<User | false> {
        return await this.userRepository.findUserByName(name)
    }

    async findUserById(id: number): Promise<User | null> {
        return await this.userRepository.findUserById(id)
    }

    private async _hashPassword(password: string): Promise<string> {
        return await this.encryption.hash(password, Number(<string>process.env.BCRYPT_SALT_NUMBER))
    }

    private _hashKPrivate(kPrivate: string): string {
        return CryptoJS.AES.encrypt(kPrivate, <string>process.env.CRYPTO_SECRET).toString()
    }
}