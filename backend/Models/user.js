const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }

},{timestamps:true})


mongoose.models = {}

const User = mongoose.model('Login', userSchema)

module.exports = User;