const mongoose = require('mongoose');

const PettycashSchema = new mongoose.Schema({
    pet_date: Date,
    pet_amount: Number,
    
    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

PettycashSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Pettycash = mongoose.model('Pettycash', PettycashSchema);

module.exports = Pettycash;