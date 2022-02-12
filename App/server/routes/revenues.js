//inventory
const express = require("express");
const router = express.Router();

const Revenues = require('../database/models/revenues');

router.get('/', (req, res) => {
    Revenues.find({})
        .then(revenues => res.send(revenues))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
    let revenues = new Revenues(req.body);
    if (req.body.number == '')
    Revenues.findOne({ number: req.number}, (err, revenue) => {
        if(revenue) {
            revenue++
        } else {
            (new Revenues(req.body.data))
                .save()
                .then((revenues) => res.send(revenues))
                .catch((error) => console.log(error));
        }
    }).catch((error) => console.log(error));

});

router.get('/:_id', (req, res) => {
    Revenues.find({})
        .then(revenues => res.send(revenues))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    Revenues.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(revenues => res.send(revenues))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Revenues.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(revenues => res.send(revenues))
        .catch(error => console.log(error));
});

module.exports = router;