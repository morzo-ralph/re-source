const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    number: Number,
    id: String,
    name: String,
    attendance_date: Date,
    attendance_hours: Date,    
       // _itemId: {
    //     type: mongoose.Types.ObjectId
    // },

    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

AttendanceSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;