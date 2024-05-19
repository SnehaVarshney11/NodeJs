const mongoose = require('mongoose');

const UsersDetails = new mongoose.Schema({
   name: {
    type: String,
    require: true 
   },
   age: {
    type: Number,
    require: true
   },
   latitude: Number,
   longitude: Number
})

const Users = mongoose.model('', UsersDetails);
module.exports = Users;