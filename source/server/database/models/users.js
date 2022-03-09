const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    username: String,
    password: String,
    userRole: Number,

    lname: String,
    fname: String,
    mname: String,
    extname: String,

    userposition: String,
    userdepartment: String,

    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

UsersSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;