const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Transaction = require('../../models/Transaction')

// gets total of each category for specified month
router.get('/:userId/transactions/categories/total', async (req, res) => {
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
                    _id: '$_id',
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
router.get('/:userId/transactions/categories/total/threeMonths', async (req, res) => {
    const {month, year} = req.query
    const userId = req.params.userId

    // const startDate = new Date(`${year}-${month.padStart(2, '0')}-01T00:00:00Z`)
    // const endDate = new Date(`${endYear}-${endMonth.padStart(2, '0')}-01T00:00:00Z`)
    const startDate = new Date(parseInt(year), parseInt(month) - 1, 1)
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0);

    // Aggregate query to get category totals grouped by month
      const categoryTotalsWithMonth = await Transaction.aggregate([
        // matches documents based on date range and userId
        {
          $match: {
            date: { $gte: startDate, $lte: endDate },
            userId: userId
          }
        },
        // Group documents by month, year, and category and adds up amount
        {
          $group: {
            _id: {
              month: { $month: "$date" },
              year: { $year: "$date" },
              category: "$category"
            },
            total: { $sum: "$amount" }
          }
        },
        // group the documents by month and year only, and create an array of objects containing the category and total for each category in that month and year.
        {
          $group: {
            _id: {
              month: "$_id.month",
              year: "$_id.year"
            },
            categories: {
              $push: {
                category: "$_id.category",
                total: "$total"
              }
            }
          }
        },
        // Project the month, year, and category as separate fields and excludes _id
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            monthNum: '$_id.month',
            year: "$_id.year",
            categories: 1
          }
        },
        // Adds the name of the month as a string
        {
            $addFields: {
                month: {
                    $let: {
                        vars: {
                            monthsInString: [,'January','Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',' November', 'December']
                        },
                        in: {
                            $arrayElemAt: ['$$monthsInString', '$month']
                        }
                    }
                }
            }
        },
        // Sort by year and month ascending
        {
          $sort: {
            year: 1,
            monthNum: 1
          }
        }
      ])

    const ref = ["Month", "Entertainment", "FoodDrink", "Groceries", "Other", "Shopping", "Travel", "Utilities"]

    function compare(a,b) {
        if (a.category < b.category) return -1
        if (a.category > b.category) return 1
        return 0
    }

    const formattedData = []
    while (categoryTotalsWithMonth.length) {
        const template = ['',0,0,0,0,0,0,0]

        const chartData = categoryTotalsWithMonth.shift()
        const categoriesArr = chartData.categories
        const month = chartData.month

        template[0] = month
        categoriesArr.sort(compare)
        for (const obj of categoriesArr) {
            const idx = ref.indexOf(obj.category)
            const total = obj.total
            template[idx] = total
        }
        formattedData.push(template)

    }

    return res.json(formattedData)
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
        amount: parseFloat(amount),
        notes,
        userId,
        date
    })

    return res.json(newTransaction)
})


module.exports = router
