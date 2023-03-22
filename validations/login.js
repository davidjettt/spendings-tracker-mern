const { check } = require('express-validator')
const User = require('../models/User')

const validateLogin = [
    check('email')
        .custom( async (value) => {
            const user = await User.findOne({email: value})
            if (!user) {
                throw new Error('Invalid Credentials')
            }
        })
]


module.exports = validateLogin
