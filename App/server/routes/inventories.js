const express = require("express");
const multer = require('multer');
const router = express.Router();
const path = require('path');


const Inventory = require('../database/models/inventory');
const Pagination = require('../middleware/paginatedResult');

const MIME_TYPE_MAP = {
    'image/png': 'png', 
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if(isValid) { error = null; } 
        cb(error, path.join(__dirname, '../uploads/inventory'));
    },
    filename: (req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, 'image-' + Date.now() + '.' + ext);
        
   }
});

const upload = multer({storage: storage});

router.post("/", upload.single('file'), (req, res) => {
    console.log(req.body);
    if(!req.file) {
        return res.status(500).send({ message: 'Upload Failed'});
    } else {
        req.body.imageUrl = 'http://localhost:3000/uploads/inventory/' + req.file.filename;
        //req.body.isArchive = 0;
        (new Inventory(req.body))
        .save()
        .then((inventory) => res.send(inventory))
        .catch((error) => (error));
    }
    
});

router.post("/update", upload.single('file'), (req, res) => {
    console.log(req.body);
    if(!req.file) {
        Inventory.findOneAndUpdate({"_id": req.body.id}, {$set: req.body})
        .then(inventory => res.send(inventory))
        .catch(error => console.log(error));
    } else {
        req.body.imageUrl = 'http://localhost:3000/uploads/inventory/' + req.file.filename;
        //req.body.isArchive = 0;
        Inventory.findOneAndUpdate({"_id": req.body.id}, {$set: req.body})
        .then(inventory => res.send(inventory))
        .catch(error => console.log(error));
    }
    
});


router.get('/', (req, res) => {
    // console.log(req.query)
    // const query = req.query
    // Inventory.find({query})
    Inventory.find({})
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

router.get('/search', async (req, res) => {
    console.log(req.query)
    const query = await req.query.name
    // console.log('query')
    // console.log(req.query.name)
    // console.log('query')
    // console.log(req.params)
    // const query2 = await req.params
    // console.log('params')
    // console.log(req.params)
    /// $or: [{name: query}, {_id: query}, {description: query}]
    Inventory.find({ $or : [
        {name: { $regex: query + '.*', '$options' : 'i'}},
        {description: {$regex: query + '.*', '$options' : 'i'}},
       // {description: { $regex: query + '.*'}},
    ]})
        .then(data => res.send(data))
        .catch((error) => console.log(error))
});
//router.get('/')
//pagination working in postman
// router.get('/', Pagination(Inventory), (req, res) => {
//     res.json(res.paginatedResults).catch((error) => {
//         res.status(500).json({message: error})
//     });
// });

router.get('/:id', (req, res) => {
    Inventory.find({})
        .then(lists => res.send(lists))
        .catch(error => console.log(error));
 });
// router.post("/", upload.single('file'), (req, res, next) => {
//     console.log(req.body);
//     if(!req.file) {
//         return res.status(500).send({ message: 'Upload Failed'});
//     } else {
//         req.body.imageUrl = 'http://localhost:3000/uploads/inventory/' + req.file.filename;
//         req.body.isArchive = 0;
//         (new Inventory(req.body))
//         .save()
//         .then((inventory) => res.send(inventory))
//         .catch((error) => (error));
//     }

router.put('/:_id', (req, res) => {
    // console.log(req.params);
    // console.log(req.body);
    Inventory.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(result => res.send(result))
        .catch(error => console.log(error));
});


router.patch('/:_id', (req, res) => {
    Inventory.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(inventory => res.send(inventory))
        .catch(error => console.log(error));
});

module.exports = router;
