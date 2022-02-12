const mongoose = require('mongoose');

const RevenuesSchema = new mongoose.Schema({
    number: {type: Number, default: 1},
    rev_date: Date,
    rev_desc: String,
    rev_by: String,
    rev_amount: Number,
    number: Number,    
       // _itemId: {
    //     type: mongoose.Types.ObjectId
    // },
    /**
     * number
     * _id
     * rev_date
     * rev_desc
     * rev_by
     * rev_amount
     * is_archive
     * created_at
     * updated_at
     */
    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

RevenuesSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Revenues = mongoose.model('Revenues', RevenuesSchema);

module.exports = Revenues;
