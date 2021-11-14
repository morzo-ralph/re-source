const mongoose = require('mongoose');

const ExpensesSchema = new mongoose.Schema({
    name: String, 
    purpose: String,
    manager: String,
    desc: String,
    from: Date,
    to: Date,
    // _itemId: {
    //     type: mongoose.Types.ObjectId
    // },

    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

ExpensesSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Expenses = mongoose.model('Expenses', ExpensesSchema);

module.exports = Expenses;