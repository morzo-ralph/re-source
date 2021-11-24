const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const Users = require("../database/models/users");

router.post('/signup', async (req, res) => { 
    (new Users(req.body))
        .save()
        .then((users) => res.send(users))
        .catch((error) => console.log(error));
});

router.get('/', (req, res) => {
    Users.find({})
    .then(users => res.send(users))
    .catch(error => console.log(error));
});

module.exports = router;