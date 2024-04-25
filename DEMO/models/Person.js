const mongoose = require('mongoose');

//Define person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    }, 
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true 
    },
    mobile: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    }
})

//Create Person Model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;