//TIME
const express = require("express");
const router = express.Router();

const Time = require('../database/models/time');

router.get('/gettime', (req, res) => {
    Time.find({})
        .then(data => { res.send(data) })
        .then()
        .catch(error => console.log(error));
});

router.post('/timein', (req, res) => {

    new Time(req.body.data)
        .save()
        .then(time => {
            console.log(time.emp_id + ' Has Timed In')
            console.log(time)
            res.json({ time, message: "Succesfully Timed In", code: "200" })
        })
        .catch(error => {
            /*console.log(time.emp_id + ' Has Failed to Time In')*/
            console.log(error)
            /*res.json({ time, message: "Failed to Time In", code: "500" })*/
        });

});

router.post('/timeout', (req, res) => {

    Time.findOneAndDelete({ "emp_id": req.body.data.emp_id })
        .then(time => {
            let dateNow = new Date();
            let dateOld = new Date(time.createdAt);
            seconds = dateNow.getTime() - dateOld.getTime();
            console.log(time.emp_id + " Has Timed Out");
            console.log(time)
            res.json({ time, seconds : seconds, message: "Succesfully Timed Out", code : "200" } )
        })
        .catch(error => {
            /*console.log(time.emp_id + ' Has Failed to Time OuT')*/
            console.log(error)
            /*res.json({ time, message: "Failed to Time Out", code: "200" })*/
        });


});

router.get('/checktime/:_id', (req, res) => {

    //console.log(req.params)

    Time.findOne({ "emp_id": req.params })
        .then(time => {
            if (time) {
                res.json({ time, message: "Successfully Pulled", code: "200" })
            }
            else {
                res.json({message: "No Time Record", code : "404"})
            }            
        })
        .catch(error => console.log(error));
});

//router.put('/:_id', (req, res) => {
//    Time.findOneAndUpdate({ "_id": req.params }, { $set: req.body.data })
//        .then(data => res.send(data))
//        .catch(error => console.log(error));
//});

//router.patch('/:_id', (req, res) => {
//    Time.findOneAndUpdate({ "_id": req.params }, { $set: req.body.data })
//        .then(data => res.send(data))
//        .catch(error => console.log(error));
//});

module.exports = router;