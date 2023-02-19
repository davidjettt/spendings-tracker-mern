const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../../models/User')
const keys = require('../../config/keys')

// checks for logged in user
router.get('/currentUser', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.email
    })
})

// signup
router.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const userEmail = await User.findOne({email: email})

    if (userEmail) {
        return res.json({message: 'User already exists'})
    }

    const newUser = await new User({
        email,
        password: bcrypt.hashSync(password)
    })

    await newUser.save()

    return res.json({
        id: newUser.id,
        email: newUser.email
    })
})

// login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email: email})

    // No user found
    if (!user) {
        res.status(404)
        return res.json({message: 'Could not find a user with this email'})
    }

    // Incorrect password
    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({message: 'Incorrect password'})

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
