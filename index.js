const express = require('express')
const mongoose = require('mongoose')
const Product = require("./models/product.model")
const app = express()

app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@backenddb.1mq46.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB`)
    .then(() => console.log('Connected!'));

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/api/products', async (req, res) => {

    try {
        const products = await Product.find({})
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})

app.get('/api/product/:id', async (req, res) => {

    try {
        const id = req.params.id
        const product = await Product.findById(id)
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})


app.put('/api/product/:id', async (req, res) => {

    try {
        const id = req.params.id
        const product = await Product.findByIdAndUpdate(id, req.body)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})


app.listen(3000)