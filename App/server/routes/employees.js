//inventory
const express = require("express");
const router = express.Router();

const Employees = require('../database/models/employees');
const Pagination = require('../middleware/paginatedResult');

router.get('/', (req, res) => {
    Employees.find({})
        .then(employees => res.send(employees))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
    (new Employees(req.body.data))
    .save()
    .then((employees) => res.send(employees))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Employees.find({})
        .then(employees => res.send(employees))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    Employees.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(employees => res.send(employees))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Employees.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(employees => res.send(employees))
        .catch(error => console.log(error));
});

module.exports = router;