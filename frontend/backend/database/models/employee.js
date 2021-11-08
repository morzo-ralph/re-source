const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
        email: String,
        image: String,
        phonenum: { type: String, required: true, maxlength: 11 },
        birthday: Date,

        fname: { type: String, required: true, maxlength: 100 },
        lname: { type: String, required: true, maxlength: 20 },
        mname: { type: String, required: false, maxlength: 20 },
        extname: { type: String, required: false, maxlength: 3 },

        isArchive: Number,
        created_at: Date,
        updated_at: Date
});

EmployeeSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Inventory;