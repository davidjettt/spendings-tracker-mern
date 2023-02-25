const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        notes: {
            type: String
        },
        userId: {
            type: String,
            required: true
        }
    }
)

const Transaction = mongoose.model('transactions', TransactionSchema)

module.exports = Transaction
