const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Transaction = require('../../models/Transaction')

// test route
router.get('/transactions/test', async (req, res) => {
    const userId = req.params.userId

    const all = await Transaction.find({})

    // const groupMonths = await Transaction.aggregate([
    //     {$group: {
    //         month: {$substr: ['$date', 5, 2]}
    //         // numberofbookings: {$sum: 1}
    //     }}
    // ]);


    const transactions = await Transaction.aggregate([
        { $match: { amount: { $gte: 800}}},
        { $group: { _id: null, amount: { $sum: "$amount" } } },
    ])

    const transDate = await Transaction.find({
        '$expr': {'$group': {_id: '$category'}},
        date: {
            $gte: new Date('2022-01-01T00:00:00Z'),
            $lt: new Date('2023-01-01T00:00:00Z')
        }
    }).exec((err) => {
        if (err) {
            console.log('ERR', err)
        }
    })

    const category = await Transaction.aggregate([
        {$project: {_id: 1, name: 1, amount: 1, category: 1, notes: 1, date: 1, userId: 1}},
        { $match: { date: { $gte: new Date('2022-01-01T00:00:00Z'), $lt: new Date('2023-01-01T00:00:00Z')}}},
        {$group: {_id: '$category'}},

    ])

    return res.json(category)
})

// get all users
router.get('/', async (req, res) => {
    const users = await User.find({}).select('-password')
    return res.json(users)
})

// get all user transactions
router.get('/:userId/transactions', async (req, res) => {
    const { month, year } = req.query
    const userId = req.params.userId

    if (year) {
        const transactions = await Transaction.find({userId: userId})
    }


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
