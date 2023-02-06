const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Transaction = require('../../models/Transaction')



// get all user transactions
router.get('/:userId/transactions', async (req, res) => {
    const userId = req.params.userId
    const transactions = await Transaction.find({userId: userId})

    return res.json(transactions)
})



module.exports = router
