const express = require('express')
const Transaction = require('../../models/Transaction')
const router = express.Router()

router.get('/', async (req, res) => {
    const transactions = await Transaction.find()

    return res.json(transactions)

})


module.exports = router
