const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../database/models/users");
const router = express.Router();

//signup
router.post('/signup', async (req, res) => {
    const data = req.data;

    if(!(data.email && data.password)) {
        return res.status(400).send({error: "Data not formatted properly"})
    }

    //hashing
    const users = new Users(data);
    const salt = await bcrypt.genSalt(10);
    users.password = await bcrypt.hash(user.password, salt);
    users.save().then((doc) => res.status(201).send(doc));
});

//login compare password
router.post('/login', async (req, res) => {
    const data = req.data;
    const users = await Users.findOne({ email: data.email });

    if(users) {
        const validPassword = await bcrypt.compare(data.password, users.password);
        if(validPassword) {
            res.status(200).json({ message: "Credentials matched!" });
        } else {
            res.status(400).json({ message: "Credentials doesn't matched!" });
        }
    } else {
        res.status(401).json({ error: "User doesn't exist!" })
    }
});

module.exports = router;