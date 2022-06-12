import { PassportStatic } from 'passport'
import { Strategy as JwtStrategy, StrategyOptions, ExtractJwt } from 'passport-jwt'
import { IUserRepository } from '../../user/interface/IUserRepository'
import { UserRepository } from '../../user/module'
import { IPublicUser } from '../interface/IPublicUser'



const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: <string>process.env.JWT_SECRET,
    ignoreExpiration: false
}

export const configureJwtStrategy = (UserRepository: IUserRepository, passport: PassportStatic): void => {
    passport.use(new JwtStrategy(options,
        async (payload, done) => {
            try {
                const { sub: id } = payload
                const user = await UserRepository.findUserById(id)
                if (user) {
                    const { password, kPrivate, ...rest } = user
                    const publicUser: IPublicUser = rest
                    return done(null, publicUser)
                }
            } catch (error) {
                return done(new Error('jwt error'), false)
            }
        }
    ))
}