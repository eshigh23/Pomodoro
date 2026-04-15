const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String,  selected: false },
    email: { type: String, unique: true, required: true, selected: false },
    googleId: { type: String, unique: true, sparse: true, selected: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

module.exports = User