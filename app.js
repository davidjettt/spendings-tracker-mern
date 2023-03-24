require('dotenv').config()
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const db = require('./config/keys').mongoURI
const transactions = require('./routes/api/transactions')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')
const passport = require('passport')
const cors = require('cors')
const app = express()

// goes to build directory when in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    // console.log('PATH>>>>>>', path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  })
} else {
  app.use(cors())
}

// console.log('DIR name', __dirname)
// console.log('PATH>>>>>>', path.resolve(__dirname, 'frontend', 'build', 'index.html'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// using mongoose to connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// initializes passport
app.use(passport.initialize())
require('./config/passport')

// connects API routes to app
app.use('/api/transactions', transactions)
app.use('/api/users', users)
app.use('/api/auth', auth)

const PORT = process.env.PORT || 8001

app.listen(PORT, () => {
console.log(`Listening on port: ${PORT}`)
})
