import { inject, injectable } from "inversify"
import { sign } from "jsonwebtoken"
import { TYPES } from "../../../config/inversify.types"
import { IUserRepository } from "../../user/interface/IUserRepository"
import { ILoginResponse } from "../interface/ILoginResponse"

@injectable()
export class AuthService {
    constructor(
        @inject(TYPES.User.Repository) private userRepository: IUserRepository
    ) {
        this.userRepository = userRepository
    }
    async login(userId: number): Promise<ILoginResponse> {
        console.log(userId)
        const user = await this.userRepository.findUserById(userId)
        if (!user) {
            throw Error("Usuario inexistente")
        }
        const { kPrivate, password, ...rest } = user
        const payload = { sub: rest.id }
        const access_token = this.signAccessToken(payload)
        return {
            user: rest,
            access_token
        }
    }

    signAccessToken(payload: { sub: number }): string {
        return sign(payload, <string>process.env.JWT_SECRET, { expiresIn: "6h" })
    }
}