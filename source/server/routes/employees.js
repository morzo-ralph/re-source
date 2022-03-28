
const express = require("express");
const bcrypt = require("bcrypt");
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

router.post('/signup', async (req, res) => {

    let employees = new Employees(req.body);
    const encryptedpword = await bcrypt.hash(req.body.password, 10);
    //console.log(encryptedpword);
    req.body.password = encryptedpword;
    console.log(req.body);
    Employees.findOne({ id: employees.id }, (err, employee) => {
        if (employee) {
            res.status(200).json({ message: "employee already exist" })
        } else {
            (new Employees(req.body))
                .save()
                .then((employees) => res.send(employees))
                .catch((error) => console.log(error));
        }
    })
        .catch((error) => console.log(error));
});

router.post('/login', async (req, res) => {
    // let newUser = new Employees(req.body);
    id = req.body.data.id;
    let password = req.body.data.password;
    console.log(req.body.data);
    console.log(id, password);
    Employees.findOne({ id })
        .then((employee) => {
            if (employee && bcrypt.compareSync(password, employee.password)) {
                res.status(200)
                    .json({ employee, message: "Account logged in successful" })
            } else if (employee && !bcrypt.compareSync(password, employee.password)) {
                res.status(401).json({ message: "Invalid Credentials" });
            } else {
                res.status(500).json({ message: "Account doesn't Exist" })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Account doesn't exist! " + error });
        }
        );
});


router.post('/try', (req, res) => {
    console.log(req.body);
    if (Employees.find({ "id": req.body.id })) {
        console.log("exist");
    } else {
        console.log("does not exist");
    }
    if (Employees.find({ "password": bcrypt.compare(req.body.password) })) {
        console.log("same pword");
    } else { console.log("password doesn't match"); }
    // .then(employees => res.send(employees))
    // .catch(error => console.log(error));
});

router.get('/:id', (req, res) => {
    Employees.findOne({})
        .then(employees => res.send(employees))
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