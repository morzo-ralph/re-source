const express = require("express");
const router = express.Router();

const Pettycash = require('../database/models/pettycash');

router.get('/', (req, res) => {
    Pettycash.find({})
        .then(pettycash => res.send(pettycash))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
    console.log(req.body.data);
    (new Pettycash(req.body.data))
    .save()
    .then((pettycash) => res.send(pettycash))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Pettycash.find({})
        .then(pettycash => res.send(pettycash))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    // console.log(req.params);
    // console.log(req.body);
    Pettycash.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(pettycash=> res.send(pettycash))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Pettycash.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(pettycash => res.send(pettycash))
        .catch(error => console.log(error));
});

module.exports = router;