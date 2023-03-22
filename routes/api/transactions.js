const express = require('express')
const Transaction = require('../../models/Transaction')
const router = express.Router()

// get all transactions
router.get('/', async (req, res) => {
    const transactions = await Transaction.find()

    return res.json(transactions)

})

// update an existing transaction
router.put('/:transactionId', async (req, res) => {
    const filter = {_id: req.params.transactionId}
    const options = req.body
    const transaction = await Transaction.findOneAndUpdate(filter, options, {new: true, upsert: true})

    return res.json(transaction)
})

// delete a transaction
router.delete('/:transactionId', async(req, res) => {
    const transaction = await Transaction.findOneAndDelete({_id: req.params.transactionId})
    return res.json({message: "Successfully deleted transaction"})
})


module.exports = router
