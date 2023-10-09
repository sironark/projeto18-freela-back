import Joi from "joi";


export const SignupSchema = Joi.object({
        name: Joi.string().required().min(1),
        email: Joi.string().required().min(1).email(),
        city: Joi.string().required().min(1),
        phone: Joi.string().required().min(1),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password'))
});

export const SiginSchema = Joi.object({
        email: Joi.string().required().min(1).email(),
        password: Joi.string().required().min(1)        
});

export const ServiceSchema = Joi.object({
        title: Joi.string().required().min(1),
        description:Joi.string().required().min(10).max(300),
        price: Joi.number().required(),
        photos: Joi.array().required()     
});
