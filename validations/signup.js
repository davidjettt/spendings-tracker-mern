const { check } = require('express-validator')
const User = require('../models/User')

const validateSignup = [
    check('email')
        .isEmail()
        .withMessage('Invalid email address'),
    check('email')
        .custom(async (value) => {
            const user = await User.findOne({email: value})
            if (user) {
                throw new Error('Email already in use')
            }
        }),
    check('password')
        .isLength({min: 6, max: 26})
        .withMessage('Password needs to be between 6 and 26 characters')
]

module.exports = validateSignup
