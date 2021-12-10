const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const Users = require("../database/models/users");

router.post('/signup', async (req, res) => { 
    
    console.log(req.body)
    const encryptedpword =  await bcrypt.hash(req.body.password, 10);
    console.log(encryptedpword);

    if(bcrypt.compare(req.body.password, encryptedpword)){
        console.log(1);
    } else {console.log(0)}
//     (new Users(req.body))
//         .save() 
//         .then((users) => res.send(users))
//         .catch((error) => console.log(error));
}
);

router.get('/', (req, res) => {
    Users.find({})
    .then(users => res.send(users))
    .catch(error => console.log(error));
});

module.exports = router;