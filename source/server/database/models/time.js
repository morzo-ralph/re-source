const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;


const TimeSchema = new mongoose.Schema({

    _id: { type: ObjectIdSchema, default: new ObjectId() },
    emp_id: String,       

},{ timestamps: true });

const Time = mongoose.model('Time', TimeSchema);

module.exports = Time;