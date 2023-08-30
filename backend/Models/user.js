const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    company:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    }

},{timestamps:true})


mongoose.models = {}

const User = mongoose.model('Login', userSchema)

module.exports = User;