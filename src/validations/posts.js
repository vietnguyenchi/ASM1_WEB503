import Joi from "joi";

export const postValidator = Joi.object({
    title: Joi.string().required().empty().min(5),
    description: Joi.string().required().empty(),
    image: Joi.string().required().empty(),
    author: Joi.string().required().empty(),
    category: Joi.number().required().empty(),
})