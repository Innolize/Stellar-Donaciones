import { Schema } from "joi"

export const bodyValidator = async <T>(schema: Schema, validateObject: T): Promise<T> => {
    return await schema.validateAsync(validateObject, { stripUnknown: true, abortEarly: false })
}