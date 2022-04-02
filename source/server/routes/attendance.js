//inventory
const express = require("express");
const router = express.Router();

const Attendance =  require('../database/models/attendance');
const Pagination = require('../middleware/paginatedResult');

router.get('/', (req, res) => {
    Attendance.find({})
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
    (new Attendance(req.body.data))
    .save()
    .then((data) => res.send(data))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Attendance.findOne({})
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    Attendance.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Attendance.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

module.exports = router;