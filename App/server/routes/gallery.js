const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const moongoose = require('mongoose');
const path = require('path');
const Gallery = require('../database/models/gallery');

//const upload = multer({dest: '/uploads'});

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
         cb(null, path.join(__dirname, '../uploads/'));
     },
     filename: (req, file, cb) => {
         cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({storage: storage});

router.post("/", upload.single('file'), (req, res) => {
    //console.log(req.file);
    const file = req.file;
    const data = req.body;
    console.log(file.filename, file.path);
    var filename = file.filename;
    var path = file.path
    var uploadFile = {filename, uploadFile};
    (new Gallery(uploadFile))
    .save()
    .then((gallery) => res.send(gallery))
    .catch((error) => console.log(error));
   return res.status(200).send('File uploaded successfully!');
});

router.post('/:id', function (req, res, next) {
     Gallery.findById(req.params.id, function (err, gallery) {
         if (err) return next(err);         res.json(gallery);
     });
 });

module.exports = router;