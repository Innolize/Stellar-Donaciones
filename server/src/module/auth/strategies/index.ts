import { Container } from "inversify";
import { PassportStatic } from "passport";
import { TYPES } from "../../../config/inversify.types";
import { IUserRepository } from "../../user/interface/IUserRepository";
import { configureJwtStrategy } from "./JwtStrategy";
import { configureLocalStrategy } from "./LocalStrategy";


export const configurePassportStrategies = (container: Container, passport: PassportStatic): void => {
    const userRepository = container.get<IUserRepository>(TYPES.User.Repository)
    configureJwtStrategy(userRepository, passport)
    configureLocalStrategy(userRepository, passport)
}