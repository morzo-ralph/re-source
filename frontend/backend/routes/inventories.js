//inventory
const express = require("express");
const router = express.Router();

const Inventory = require('../database/models/inventory');

router.get('/', (req, res) => {
    Inventory.find({})
        .then(inventory => res.send(inventory))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
    (new Inventory(req.body.data))
    .save()
    .then((inventory) => res.send(inventory))
    .catch((error) => console.log(error));
    
});

router.get('/:inventoryId', (req, res) => {
    Inventory.find({})
        .then(lists => res.send(lists))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    Inventory.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(inventory => res.send(inventory))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Inventory.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(inventory => res.send(inventory))
        .catch(error => console.log(error));
});

module.exports = router;