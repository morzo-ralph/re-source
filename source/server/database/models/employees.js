const mongoose = require('mongoose');

//export interface Employees {
//    number: number,
//    id: string,

//    lname: string,
//    fname: string,
//    mname: string,
//    extname: string,

//    start_Date: Date,

//    birth_Date: Date,

//    address: string,
//    position: string,
//    department: string,

//    role: number,

//    password: string,

//    isArchive: number,
//    created_at: Date,
//    updated_at: Date
//}

const EmployeesSchema = new mongoose.Schema({

    number: Number,

    _id: String,
    id: String,

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

    role: Number,

    password: String,

    isArchive: Number,
    created_at: Date,
    updated_at: Date

    //number: Number,
    //id: String,
    //name: String,
    //age: String,
    //address: String,
    //position: String,
    //department: String,
    //start_Date: Date,

    //role: Number,    

    //isArchive: Number,
    //created_at: Date,
    //updated_at: Date
});

EmployeesSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Employees = mongoose.model('Employees', EmployeesSchema);

module.exports = Employees;