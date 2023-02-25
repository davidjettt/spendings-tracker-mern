const express = require('express')
const Transaction = require('../../models/Transaction')
const router = express.Router()

// get transactions by user id
router.get('/', async (req, res) => {
    const transactions = await Transaction.find()

    return res.json(transactions)

})

// delete a transaction
router.delete('/:transactionId', async(req, res) => {
    const transaction = await Transaction.findOneAndDelete({_id: req.params.transactionId})
    return res.json({message: "Successfully deleted transaction"})
})


module.exports = router
