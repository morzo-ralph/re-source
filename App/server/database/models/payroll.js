const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
    number: Number,
    id: String,
    payr_date: Date,
    payr_supplier: String,
    purc_desc: String,
    purc_by: String,
    purc_amount: Number,    
    
    isArchive: {type: Number, default: 0},
    created_at: Date,
    updated_at: Date
});

PayrollSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Payroll = mongoose.model('Payroll', PayrollSchema);

module.exports = Payroll;