import Joi from "joi";

export const signUpValidator = Joi.object({
    name: Joi.string().required().empty().max(255),
    email: Joi.string().required().empty().email(),
    password: Joi.string().required().empty().min(6).max(12),
    confirmPassword: Joi.string().required().empty().min(6).max(12).valid(Joi.ref("password"))
})

export const signInValidator = Joi.object({
    email: Joi.string().required().empty().email(),
    password: Joi.string().required().empty().min(6).max(12),
})