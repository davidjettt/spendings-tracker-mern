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
    const { name, category, amount, notes, date  } = req.body
    const userId = req.params.userId

    const newTransaction = await Transaction.create({
        name,
        category,
        amount,
        notes,
        userId,
        date
    })

    return res.json(newTransaction)
})

// update an existing transaction
router.put('/:userId/transactions/:transactionId', async (req, res) => {
    const userId = req.params.userId

    const filter = {_id: req.params.transactionId}
    const options = req.body
    const transaction = await Transaction.findOneAndUpdate(filter, options, {new: true, upsert: true})

    return res.json(transaction)


})


module.exports = router
