const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Transaction = require('../../models/Transaction')

// filtering by specified timeframe and group by category with amount for each category
router.get('/:userId/transactions/aggregate', async (req, res) => {
    const { month, year } = req.query
    const userId = req.params.userId

    let endMonthInt = Number(month) + 1
    let endYearInt = Number(year)

    if (endMonthInt === 13) {
        endMonthInt = 1
        endYearInt += 1
    }

    const endMonth = endMonthInt.toString()
    const endYear = endYearInt.toString()

    // const groupMonths = await Transaction.aggregate([
    //     {$group: {
    //         month: {$substr: ['$date', 5, 2]}
    //         // numberofbookings: {$sum: 1}
    //     }}
    // ]);

    // filtering by specified timeframe and group by category with amount for each category
    const transactions = await Transaction.aggregate([
        { $match: {userId: userId} },
        { $match: {date: { $gte: new Date(`${year}-${month.padStart(2, '0')}-01T00:00:00Z`), $lt: new Date(`${endYear}-${endMonth.padStart(2, '0')}-01T00:00:00Z`)}}},
        { $group: {_id: '$category', total: { $sum: '$amount' }} },
        { $sort: {total: -1} }
    ])
    const formattedTransactions = {}

    transactions.forEach((transaction) => {
        const category = transaction._id
        const total = transaction.total
        formattedTransactions[category] = total
    })


    // const transDate = await Transaction.find({
    //     '$expr': {'$group': {_id: '$category'}},
    //     date: {
    //         $gte: new Date('2022-01-01T00:00:00Z'),
    //         $lt: new Date('2023-01-01T00:00:00Z')
    //     }
    // }).exec((err) => {
    //     if (err) {
    //         console.log('ERR', err)
    //     }
    // })

    // const category = await Transaction.aggregate([
    //     {$project: {_id: 1, name: 1, amount: 1, category: 1, notes: 1, date: 1, userId: 1}},
    //     { $match: { date: { $gte: new Date('2022-01-01T00:00:00Z'), $lt: new Date('2023-01-01T00:00:00Z')}}},
    //     {$group: {_id: '$category'}},

    // ])
    // console.log('Formattted data backend', formattedTransactions)
    return res.json(formattedTransactions)
})

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
        amount: parseInt(amount),
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

// get user transactions based on month


module.exports = router
