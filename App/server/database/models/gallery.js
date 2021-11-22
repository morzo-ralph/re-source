const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    imageUrl: String,
    imageTitle: String,
    imageDesc: String,
    uploaded: {
        type: Date,
        default: Date.now
    },    
});

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;