const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const Users = require("../database/models/users");

router.post('/signup', async (req, res) => { 
    
    let users = new Users(req.body);
    const encryptedpword =  await bcrypt.hash(req.body.password, 10);
    console.log(encryptedpword);
    req.body.password = encryptedpword; 
    console.log(req.body);
    Users.findOne({ username: users.username}, (err, user) => {
        if (user){
            res.status(200).json({message: "user already exist"})
        } else {
            (new Users(req.body))
            .save()
            .then((users) => res.send(users))
            .catch((error) => console.log(error));
        }
    })
      .catch((error) => console.log(error));
});

router.post('/login', async (req, res) => {
    Users.findOne({username: req.body.username})
    .then(
        
        res.end()
    )
    .catch(
        res.status(500).json({})
    );
        // let users = new Users(req.body);
        // Users.findOne({ username : users.username}, (err, user) => {
        //     if (!user) {
        //         res.status(200).json({ hasError: true, message: "Account doesn't exist!"});
        //         Users.catch((error) => (error));
        //     } else if (!bcrypt.compareSync(users.password, user.password)){
        //         res.status(401).json({ auth: false, hasError: true, message: "Invalid credentials" });
        //         res.end();
        //         Users.catch((error) => (error));
        //     } else {
        //         res.status(200).json({ auth: true, hasEror: false, message: "Welcome " + user.fname });
        //         res.end();
        //         Users.then((users) => (users))
        //             .catch((error) => (error));
        //     }
        // }).catch((err) => {
        //     res.status(500).json({message: "User doesn't exist!" + err});
        //     res.end();
        // });
});

router.post('/try', (req, res) => {
    console.log(req.body);
    if(Users.find({"username" : req.body.username})){
        console.log("exist");
    } else {
        console.log("does not exist");
    }
    if(Users.find({"password" : bcrypt.compare(req.body.password)}))
    {
        console.log("same pword");
    } else
    { console.log("password doesn't match");}
    // .then(users => res.send(users))
    // .catch(error => console.log(error));
});
module.exports = router;