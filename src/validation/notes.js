const Joi = require('joi');
const { HttpCode } = require('../helpers/constants.js')

const schemaCreate = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    note: Joi.string()
        .min(3)
        .max(100)
        .required(),

    isImportant: Joi.boolean().required(),
    owner: Joi.string().optional()
})

const schemaUpdate = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .optional(),
    note: Joi.string()
        .min(3)
        .max(100)
        .optional(),

    isImportant: Joi.boolean().required(),
    owner: Joi.string().optional()
}).min(1);

const validate = (schema, body, next) => {
    const { error } = schema.validate(body)
    if (error) {
        const [{ message }] = error.details
        return next({
            status: HttpCode.BAD_REQUEST,
            message: `Filed:${message.replace(/"/g, '')}`,//reqexp  
            data: 'Bad Request!'
        })
    }
    next()
}

module.exports.validateCreateNotes = (req, res, next) => {
    return validate(schemaCreate, req.body, next)
}
module.exports.validateUpdateNotes = (req, res, next) => {
    return validate(schemaUpdate, req.body, next)
}



