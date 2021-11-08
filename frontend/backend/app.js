const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const List = require('./database/models/list');
const Task = require('./database/models/task');
const Inventory = require('./database/models/inventory');

app.use(express.json());
/*
*CORS
*localhost:3000 - backend
*localhost:4200 - frontend
*list and task crud
*/

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//inventory
app.get('/inventories', (req, res) => {
    Inventory.find({})
        .then(inventory => res.send(inventory))
        .catch(error => console.log(error));
});

app.post('/inventories', (req, res) => {  
    (new Inventory(req.body.a))
    .save()
    .then((inventory) => res.send(inventory))
    .catch((error) => console.log(error));
    
});

app.get('/inventory/:inventoryId', (req, res) => {
    Inventory.find({})
        .then(lists => res.send(lists))
        .catch(error => console.log(error));
});

app.put('/inventories/:_id', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    Inventory.findOneAndUpdate({"_id": req.params}, {$set: req.body.a})
        .then(inventory => res.send(inventory))
        .catch(error => console.log(error));
});

app.patch('/inventories/:_id', (req, res) => {
    Inventory.findOneAndUpdate({"_id": req.params}, {$set: req.body.a})
        .then(inventory => res.send(inventory))
        .catch(error => console.log(error));
});

//employee
app.get('/employees', (req, res) => {
    Employee.find({})
        .then(employee => res.send(employee))
        .catch(error => console.log(error));
});

app.post('/employees', (req, res) => {  
    (new Employee(req.body.a))
    .save()
    .then((employee) => res.send(employee))
    .catch((error) => console.log(error));
    
});

app.get('/employees/:employeeId', (req, res) => {
    Employee.find({})
        .then(employee => res.send(employee))
        .catch(error => console.log(error));
});

app.put('/employees/:_id', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    Employee.findOneAndUpdate({"_id": req.params}, {$set: req.body.a})
        .then(employee => res.send(employee))
        .catch(error => console.log(error));
});

app.patch('/employees/:_id', (req, res) => {
    Employee.findOneAndUpdate({"_id": req.params}, {$set: req.body.a})
        .then(employee => res.send(employee))
        .catch(error => console.log(error));
});

/**
 * truncate collection
app.delete('/inventories/:inventoryId', (req, res) => {
    Inventory.remove({})
    .then(inventory => res.send(inventory))
    .catch(error => console.log(error));
});
 */
    

app.listen(3000, () => console.log("Connected port 3000"));