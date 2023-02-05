require('dotenv').config()
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const db = require('./config/keys').mongoURI
const transactions = require('./routes/api/transactions')

const app = express()

const http = require('http').Server(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));


app.get("/", (req, res) => res.send("Hello World"));

app.use('/api/transactions', transactions)

const PORT = process.env.PORT || 8001

// app.listen(PORT, () => {
// console.log(`Listening on port: ${PORT}`)
// })
http.listen(PORT, () => {
  console.log('Listening on port ' + PORT)
})
