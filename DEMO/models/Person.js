const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true,
    }
})

personSchema.pre('save', async function(next){
    const person = this;

    //if password is already in use
    if(!person.isModified('password')) return next();

    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10); // generate the salt

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //override plain password with hashed password 
        person.password = hashedPassword;
        next();
    }catch(err) {
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePwd) {
    try{
        //compare method extract the salt from the actual password then create a new pwd with enterd pass + salt then it will compare
        const isMatch = await bcrypt.compare(candidatePwd, this.password);
        return isMatch;
    }catch(err) {
        throw err;
    }
}

//Create Person Model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;