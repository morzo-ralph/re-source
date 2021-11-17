//inventory
const express = require("express");
const router = express.Router();

const Stocks = require('../database/models/stocks');

router.get('/', (req, res) => {
    Stocks.find({})
        .then(stocks => res.send(stocks))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
    (new Stocks(req.body.data))
    .save()
    .then((stocks) => res.send(stocks))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Stocks.find({})
        .then(stocks => res.send(stocks))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    Stocks.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(stocks => res.send(stocks))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Stocks.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(stocks => res.send(stocks))
        .catch(error => console.log(error));
});

module.exports = router;