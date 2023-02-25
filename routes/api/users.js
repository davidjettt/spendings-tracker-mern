const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Transaction = require('../../models/Transaction')



// get all users
router.get('/', async (req, res) => {
    const users = await User.find({}).select('-password')
    return res.json(users)
})

// get all user transactions
router.get('/:userId/transactions', async (req, res) => {
    const userId = req.params.userId
    const transactions = await Transaction.find({userId: userId})

    return res.json(transactions)
})


// post a new transaction
router.post('/:userId/transactions', async (req, res) => {
    const { name, category, amount, notes  } = req.body
    const userId = req.params.userId

    const newTransaction = await Transaction.create({
        name,
        category,
        amount,
        notes,
        userId
    })

    return res.json(newTransaction)
})

// update an existing transaction
router.put('/:userId/transac')

// delete a transaction


module.exports = router
