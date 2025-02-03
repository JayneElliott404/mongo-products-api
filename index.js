const express = require('express')
const mongoose = require('mongoose');
const app = express()

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@backenddb.1mq46.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB`)
  .then(() => console.log('Connected!'));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)