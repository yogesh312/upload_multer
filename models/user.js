const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    mobile:{
        type: Number,
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)