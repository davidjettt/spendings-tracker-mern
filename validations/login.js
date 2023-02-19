const { check } = require('express-validator')
const User = require('../models/User')

const validateLogin = [
    check('email')
        .custom( async (value) => {
            const user = await User.findOne({email: value})
            if (!user) {
                throw new Error('Could not find a user with this email')
            }
        })
]


module.exports = validateLogin
