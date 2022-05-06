const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const EmployeesSchema = new mongoose.Schema({

    number: Number,

    _id: { type: ObjectIdSchema, default: new ObjectId() },
    emp_id: String,

    lname: String,
    fname: String,
    mname: String,
    extname: String,

    imgUrl: String,

    start_Date: Date,

    birth_Date: Date,

    address: String,
    position: String,
    department: String,

    role: { type: String, default: 'developer' },

    password: String,

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