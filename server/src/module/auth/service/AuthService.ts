import { inject, injectable } from "inversify"
import { sign,verify } from "jsonwebtoken"
import { TYPES } from "../../../config/inversify.types"
import { IUserRepository } from "../../user/interface/IUserRepository"
import { IJwtToken } from "../interface/IJwtToken"
import { ILoginResponse } from "../interface/ILoginResponse"

@injectable()
export class AuthService {
    constructor(
        @inject(TYPES.User.Repository) private userRepository: IUserRepository
    ) {
        this.userRepository = userRepository
    }
    async login(userId: number): Promise<ILoginResponse> {
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

    async verifyToken(userToken: string) {
        const token = verify(userToken, <string>process.env.JWT_SECRET) as unknown as IJwtToken
        const { sub } = token
        const payload = { sub }
        const user = await this.userRepository.findUserById(sub)
        if (!user) {
            throw Error("Usuario inexistente")
        }
        const { kPrivate, password, ...rest } = user

        const access_token = this.signAccessToken(payload)
        return {
            user: rest,
            access_token,
        }
    }

    signAccessToken(payload: { sub: number | undefined }): string {
        return sign(payload, <string>process.env.JWT_SECRET)
    }
}