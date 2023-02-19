const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../../models/User')
const keys = require('../../config/keys')
const { validationResult } = require('express-validator')
const validateSignup = require('../../validations/signup')
const validateLogin = require('../../validations/login')

// checks for logged in user
router.get('/currentUser', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.email
    })
})

// signup
router.post('/signup', validateSignup, async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array().map(err => `${err.msg}`)})
    }

    const { email, password } = req.body

    const newUser = await new User({
        email,
        password: bcrypt.hashSync(password)
    })

    await newUser.save()

    const payload = {
        id: newUser.id,
        email: newUser.email
    }
    const token = jwt.sign(payload, keys.secretOrKey, {expiresIn: 604800})

    return res.json({
        id: newUser.id,
        email: newUser.email,
        token: 'Bearer ' + token
    })
})

// login route
router.post('/login', validateLogin, async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email: email})

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array().map(err => `${err.msg}`)})
    }

    // // Incorrect password
    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({errors: ['Incorrect password']})

    const payload = {
        id: user.id,
        email: user.email
    }
    const token = jwt.sign(payload, keys.secretOrKey, {expiresIn: 604800})

    return res.json({
        message: 'Successfully logged in',
        id: user.id,
        email: user.email,
        token: 'Bearer ' + token
    })
})



module.exports = router
