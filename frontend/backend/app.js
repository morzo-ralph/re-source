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

//lists model
app.get('/lists', (req, res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch(error => console.log(error));
});

app.post('/lists', (req, res) => {
    (new List({'title' : req.body.title}))
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

app.get('/lists/:listId', (req, res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch(error => console.log(error));
});

app.patch('/lists/:listId', (req, res) => {
    List.findOneAndUpdate({'id': req.params.listId}, {$set: req.body})
        .then(lists => res.send(lists))
        .catch(error => console.log(error));
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
    console.log(req.body);
    Inventory.findOneAndUpdate({"_id": req.params}, {$set: req.body.a})
        .then(inventory => res.send(inventory))
        .catch(error => console.log(error));
});

app.patch('/inventories/:_id', (req, res) => {
    console.log(req.params);
    Inventory.findOneAndUpdate({"_id": req.params}, {$set: req.body.a})
        .then(inventory => res.send(inventory))
        .catch(error => console.log(error));
});

app.delete('/inventories/:inventoryId', (req, res) => {
    Inventory.findByIdAndRemove(req.params.i)
    .then(inventory => res.send(inventory))
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