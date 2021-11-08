const mongoose = require('mongoose');

const HrSchema = new mongoose.Schema({
        email: Number,
        image: String,
        username: String,    
        supplier: String,
        isArchive: Number,
        created_at: Date,
        updated_at: Date
});

HrSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Hr = mongoose.model('Hr', HrSchema);

module.exports = Inventory;