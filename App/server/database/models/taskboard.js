const mongoose = require('mongoose');

const TaskBoardSchema = new mongoose.Schema({
        taskBoard_name: String,
        taskBoard_content: String, 
        imageUrl: String,

        isArchive: Number,
        created_at: Date,
        updated_at: Date
});

TaskBoardSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const TaskBoard = mongoose.model('TaskBoard', TaskBoardSchema);

module.exports = TaskBoard;