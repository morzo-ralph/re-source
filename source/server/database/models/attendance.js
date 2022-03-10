const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({

//    export interface Attendance_Data {
//    number: number;
//    _id: string;
//    id: string;
//    name: string;
//    attendance_date: string;
//    attendance_hours: number;
//}


    number: Number,
    id: String,
    name: String,
    attendance_date_in: Date,
    attendance_date_out: Date,
    attendance_hours: Number,    
       // _itemId: {
    //     type: mongoose.Types.ObjectId
    // },

    isArchive: {
        type: Number, default: 0
    },
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