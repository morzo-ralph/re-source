const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const moongoose = require('mongoose');
const path = require('path');
const Gallery = require('../database/models/gallery');

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
        cb(error, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLocaleLowerCase().split(' ').join('-'); 
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
        
   }
});

const upload = multer({storage: storage});

router.post("/", upload.single('file'), (req, res, next) => {
    console.log(req.body);
    console.log(req.name)
    //console.log(req.file); working
    // console.log(req)

    // console.log('next');
    // console.log(res);
    // const file = req.file;
    // const data = req.body;

    // if(!req.file) {
    //     return res.status(500).send({message: 'Upload Failed!'});
    // } else {
    //     req.body.imageUrl = 'http://192.168.0.7:3000/uploads/' + req.file.filename;
    //     Gallery.create(req.body, function (err, gallery){
    //         if(err){
    //             console.log(err);
    //             return next(err);
    //         }
    //         res.json(gallery);
    //     });
    // }
});

router.get('/:id', function (req, res, next) {
     Gallery.findById(req.params.id, function (err, gallery) {
         if (err) return next(err);
         res.json(gallery);
     });
 });

module.exports = router;