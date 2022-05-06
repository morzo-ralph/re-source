
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Employees = require('../database/models/employees');

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

router.post('/signup', async (req, res) => {

    let employees = new Employees(req.body);
    let encryptedpword = await bcrypt.hash(req.body.password, 10);

    req.body.password = encryptedpword;
    console.log();
    console.log(req.body);

    Employees.findOne({ emp_id}, (err, employee) => {
        if (employee) {
            res.json({ message: "Employee already exist" })
        } else {
            (new Employees(req.body))
                .save()
                .then((employees) => res.send(employees))
                .then(() => {
                    console.log("Created New Employee")
                    console.log(employees)
                })
                .catch((error) => console.log(error))                
        }
    })
});

router.post('/login', async (req, res) => {

    console.log(req.body)
    console.log(req.body.emp_id)

    let emp_id = req.body.data.emp_id;
    let password = req.body.data.password;

    Employees.findOne({ emp_id })
        .then((employee) => {
            if (employee && bcrypt.compareSync(password, employee.password)) {
                res.json({ employee, message: "Account logged in successfully", status: "200" });
                console.log("Employee " + employee.emp_id + " Logged In");
            } else if (employee && !bcrypt.compareSync(password, employee.password)) {
                res.json({ message: "Invalid Credentials", status: "401"});
            } else {
                res.json({ message: "Account doesn't Exist", status: "404" });
            }
        })
        .catch((error) => {
            res.json({ message: "Something Went Wrong : ", error : error, status: "404" });
        });
});

router.get('/:id', (req, res) => {
    Employees.findOne({})
        .then(employees => res.send(employees))
        .then(() => {
            console.log("Get Successful");
            console.log(employees);
        })
        .catch(error => console.log(error));
});

router.delete('/:id', (req, res) => {
    Employees.findOneAndDelete({"_id": req.params})        
        .then(employees => res.send(employees))
        .then(() => {
            console.log("Delete Successful");
            console.log(employees);
        })
        .catch(error => console.log(error));
});

router.put('/:id', (req, res) => {
    Employees.findOneAndUpdate({"id": req.params}, {$set: req.body.data})
        .then(employees => res.send(employees))
        .catch(error => console.log(error));
});

router.patch('/:id', (req, res) => {
    Employees.findOneAndUpdate({"id": req.params}, {$set: req.body.data})
        .then(employees => res.send(employees))
        .catch(error => console.log(error));
});

module.exports = router;