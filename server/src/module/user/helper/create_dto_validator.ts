import Joi from "joi"

export const validateCreateUserSchema = {
    email: Joi.string()
        .min(10)
        .max(30)
        .required(),
    password: Joi.string()
        .min(6)
        .max(20)
        .required()
}

export const validateCreateUserDto = Joi.object(validateCreateUserSchema)