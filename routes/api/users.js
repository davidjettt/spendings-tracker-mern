const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Transaction = require('../../models/Transaction')

router.get('/:userId/transactions/category-totals', async (req, res) => {
    const { year, month } = req.query
    const userId = req.params.userId

    // Aggregate query to get all transactions for a specified month and the total for each category
    const categoryTotalsByMonth = await Transaction.aggregate([
      // Match documents within the specified month and year
      {
        $match: {
          date: {
            $gte: new Date(year, month - 1, 1),
            $lte: new Date(year, month, 0)
          },
          userId: userId
        }
      },
      // Group by category and sum the amount field
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      },
      // Project the category and total as separate fields
      {
        $project: {
          _id: 0,
          category: '$_id',
          total: 1
        }
      },
      // Sort by category ascending
      {
        $sort: {
          category: 1
        }
      }
    ])


    // Aggregate query to get all transactions for a specified month and the total for each category
    const categoryTotalsByMonthWithTransactions = await Transaction.aggregate([
        // Match documents within the specified month and year
        {
        $match: {
            date: {
                $gte: new Date(parseInt(year), parseInt(month) - 1, 1),
                $lte: new Date(parseInt(year), parseInt(month), 0)
            },
            userId: userId
        }
        },
        // Group by category and sum the amount field
        {
        $group: {
            _id: '$category',
            total: { $sum: '$amount' },
            transactions: {
                $push: {
                    date: '$date',
                    name: '$name',
                    category: '$category',
                    amount: '$amount',
                    notes: '$notes'
                }
            }
        }
        },
        // Project the category, total, and transactions as separate fields
        {
        $project: {
            _id: 0,
            category: '$_id',
            total: 1,
            transactions: 1
        }
        },
        // Sort by total descending
        {
        $sort: {
            total: -1
        }
        }
    ])
    // .exec((err, results) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       // Flatten the transactions array
    //       const transactions = results.reduce((acc, curr) => {
    //         return [...acc, ...curr.transactions];
    //       }, []);
    //       // Sort the transactions by date ascending
    //       transactions.sort((a, b) => a.date - b.date);
    //       // Log the transactions and the category totals
    //       console.log('Transactions:', transactions);
    //       console.log('Category Totals:', results);
    //     }
    // })

    // Flatten transactions array. Can do this in the frontend
    const flattenedTransactions = categoryTotalsByMonthWithTransactions.reduce((acc, curr) => {
        return [...acc, ...curr.transactions]
    }, [])

    // console.log('FLATTED', flattened)

    return res.json(categoryTotalsByMonthWithTransactions)
})

// gets all transactions in a 3 month span
router.get('/:userId/transactions/threeMonths', async (req, res) => {
    const {month, year} = req.query
    const userId = req.params.userId

    // const startDate = new Date(`${year}-${month.padStart(2, '0')}-01T00:00:00Z`)
    const startDate = new Date(parseInt(year), parseInt(month) - 1, 1)
    // const endDate = new Date(`${endYear}-${endMonth.padStart(2, '0')}-01T00:00:00Z`)
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0);
    // Aggregate query to get category totals grouped by month
    const transactions = await Transaction.aggregate([
        // Match documents within the last year
        {
          $match: {
            date: {
              $gte: startDate,
              $lte: endDate
            },
            userId: userId
          }
        },
        // Group by month and category, summing the amount field
        {
          $group: {
            _id: {
              category: '$category',
              month: { $month: '$date' },
              year: { $year: '$date' }
            },
            total: { $sum: '$amount' }
          }
        },
        // Project the month and category as separate fields
        {
          $project: {
            _id: 0,
            category: '$_id.category',
            month: '$_id.month',
            year: '$_id.year',
            total: 1
          }
        },
        // Sort by year and month ascending
        {
          $sort: {
            year: 1,
            month: 1
          }
        }
      ])

    return res.json(transactions)
})

// filtering by specified timeframe and group by category with amount for each category
router.get('/:userId/transactions/aggregate', async (req, res) => {
    const { month, year } = req.query
    const userId = req.params.userId

    const startDate = new Date(parseInt(year), parseInt(month) - 1, 1)
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)

    // filtering by specified timeframe and group by category with amount for each category
    const transactions = await Transaction.aggregate([
        { $match: {userId: userId} },
        { $match: {date: { $gte: startDate, $lte: endDate }}},
        { $group: {_id: '$category', total: { $sum: '$amount' }} },
        { $sort: {total: -1} }
    ])
    const formattedTransactions = {}

    transactions.forEach((transaction) => {
        const category = transaction._id
        const total = transaction.total
        formattedTransactions[category] = total
    })

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
