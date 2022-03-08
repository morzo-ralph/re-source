const mongoose = require('mongoose');

const EmployeesSchema = new mongoose.Schema({

    number: Number,
    id: String,
    name: String,
    age: String,
    address: String,
    position: String,
    department: String,
    start_Date: Date,

    role: Number,    

    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

EmployeesSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Employees = mongoose.model('Employees', EmployeesSchema);

module.exports = Employees;