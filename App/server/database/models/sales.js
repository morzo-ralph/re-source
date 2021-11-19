const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
    sales_date: Date,
    sales_desc: String,
    sales_by: String,
    sales_amount: Number,
    sales_qty: Number,    
       // _itemId: {
    //     type: mongoose.Types.ObjectId
    // },

    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

SalesSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Sales = mongoose.model('Sales', SalesSchema);

module.exports = Sales;