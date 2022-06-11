import { PassportStatic } from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt, { compare } from 'bcrypt'
import { IUserRepository } from '../../user/interface/IUserRepository'


export const configureLocalStrategy = (userRepository: IUserRepository, passport: PassportStatic) => {
    passport.use(new LocalStrategy({ usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await userRepository.findUserByEmail(email)

                if (!user) {
                    return done(null, false, { message: "incorrect email" })
                }
                if (!await compare(password, user.password)) {
                    return done(null, false, { message: "Incorrect password" })
                }
                const { kPrivate, password: userPassword,...rest } = user
                return done(null, rest)
            } catch (error) {
                console.log(error)
                return done(error)
            }
        }
    ))
}
