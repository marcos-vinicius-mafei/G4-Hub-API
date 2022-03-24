const joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = {
        username: joi.string().max(150).required(),
        email: joi.string().max(150).required().email(),
        password: joi.string().min(6).max(1000).required(),
        plataform: joi.string().max(200),
        img: joi.string(),
        description: joi.string(),
        likedGames: joi.array(),
    }
    return joi.validate(data, schema)
}
const loginValidation = (data) => {
    const schema = {
        email: joi.string().min(6).required().email(),
        password: joi.string().min(5).required(),
    }
    return joi.validate(data, schema)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation