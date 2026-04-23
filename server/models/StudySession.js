const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studySessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    subject: {
        type: String, required: true, trim: true,
    },

    duration: {
        type: Number, // in minutes
        required: true
    },

    startedAt: {
        type: Date,
        required: true
    },

    completedAt: {
        type: Date,
    }
}, { timestmaps: true })

module.exports = mongoose.model('StudySession', studySessionSchema)