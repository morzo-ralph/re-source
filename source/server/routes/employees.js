
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Employees = require('../database/models/employees');

router.get('/', (req, res) => {
    Employees.find({})
        .then(employees => res.send(employees))
        .catch(error => console.log(error));
});

router.post('/signup', async (req, res) => {

    let employeeNew = new Employees(req.body.data);
    console.log(employeeNew)
    let encryptedpword = await bcrypt.hash(employeeNew.password, 10);
    employeeNew.password = encryptedpword;

    console.log();
    console.log(req.body);

    Employees.findOne({ "emp_id": employeeNew.emp_id }, (err, emp) => {
        if (emp) {
            res.json({ message: "Employee already exists" })
        }
        else {
            new Employees(employeeNew)
                .save()
                .then((employee) => {
                    console.log("Created New Employee")
                    console.log(employee)
                    res.send(employee)
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

    Employees.findOne({ "emp_id" : emp_id })
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

router.post('/edit', (req, res) => {

    console.log(req.body.data)

    Employees.findOneAndUpdate({ "emp_id": req.body.data.emp_id }, { $set: req.body.data })
        .then((employee) => {
            console.log(employee)


         })
        .catch((error) => {
            console.log(error)
        })

});

//router.get('/:id', (req, res) => {
//    Employees.findOne({})
//        .then(employees => res.send(employees))
//        .then(() => {
//            console.log("Get Successful");
//            console.log(employees);
//        })
//        .catch(error => console.log(error));
//});

//router.delete('/:id', (req, res) => {
//    Employees.findOneAndDelete({"_id": req.params})        
//        .then(employees => res.send(employees))
//        .then(() => {
//            console.log("Delete Successful");
//            console.log(employees);
//        })
//        .catch(error => console.log(error));
//});

//router.put('/:id', (req, res) => {
//    Employees.findOneAndUpdate({"id": req.params}, {$set: req.body.data})
//        .then(employees => res.send(employees))
//        .catch(error => console.log(error));
//});

//router.patch('/:id', (req, res) => {
//    Employees.findOneAndUpdate({"id": req.params}, {$set: req.body.data})
//        .then(employees => res.send(employees))
//        .catch(error => console.log(error));
//});

module.exports = router;